import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users/users.service';
import { UserTypesService } from '../../services/user-types/user-types.service';
import { Users } from '../../common/users-interface/users';
import { UserTypes } from '../../common/user-types-interface/user-types';
import { FormValidValidators } from '../../validators/form-valid.validators';

@Component({
  selector: 'app-users-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css'],
})
export class UsersFormComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  error = '';
  userId?: number;
  isEditMode = false;
  userTypesList: UserTypes[] = [];

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private userTypesService: UserTypesService
  ) {}

  ngOnInit(): void {
this.form = this.fb.group({
  firstName: [
    '',
    [
      Validators.required,
      FormValidValidators.notOnlyWhitespace,
      FormValidValidators.noSpecialCharacters
    ]
  ],
  lastName: [
    '',
    [
      Validators.required,
      FormValidValidators.notOnlyWhitespace,
      FormValidValidators.noSpecialCharacters
    ]
  ],
  email: [
    '',
    [
      Validators.required,
      Validators.email,
      FormValidValidators.notOnlyWhitespace
    ]
  ],
  userTypeId: [null, Validators.required],
});


    this.loadUserTypes();

    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.userId = +id;
        this.isEditMode = true;
        this.loadUser();
      }
    });
  }

  loadUserTypes(): void {
    this.userTypesService.getAll().subscribe({
      next: (types: UserTypes[]) => {
        this.userTypesList = types;
      },
      error: () => {
        this.error = 'Error loading user types';
      },
    });
  }

  loadUser(): void {
    if (!this.userId) return;
    this.usersService.getUsersById(this.userId).subscribe({
      next: (user: Users) => {
        this.form.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          userTypeId: user.userTypes?.id,
        });
      },
      error: () => {
        this.error = 'Error loading users';
      },
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const payload: Partial<Users> = {
      ...this.form.value,
      userTypes: this.userTypesList.find((t) => t.id === this.form.value.userTypeId),
    };

    if (this.isEditMode && this.userId) {
      this.usersService.updateUsers(this.userId, payload).subscribe({
        next: () => this.router.navigate(['/users']),
        error: () => {
          this.error = 'Error during update';
          this.loading = false;
        },
      });
    } else {
      this.usersService.createUsers(payload).subscribe({
        next: () => this.router.navigate(['/users']),
        error: () => {
          this.error = 'Error during creation';
          this.loading = false;
        },
      });
    }
  }
}
