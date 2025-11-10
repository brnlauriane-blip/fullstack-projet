import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserTypesService } from '../../services/user-types/user-types.service';
import { UserTypes } from '../../common/user-types-interface/user-types';
import { FormValidValidators } from '../../validators/form-valid.validators';

@Component({
  selector: 'app-user-types-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './user-types-form.component.html',
  styleUrls: ['./user-types-form.component.css'],
})
export class UserTypesFormComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  error = '';
  userTypeId?: number;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    private service: UserTypesService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      userTypes: [
        '',
        [
          Validators.required,
          FormValidValidators.notOnlyWhitespace,
          FormValidValidators.noSpecialCharacters,
        ],
      ],
    });

    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.userTypeId = +id;
        this.isEditMode = true;
        this.loadUserType();
      }
    });
  }

  loadUserType(): void {
    if (!this.userTypeId) return;

    this.service.getById(this.userTypeId).subscribe({
      next: (data: UserTypes) => {
        this.form.patchValue({
          userTypes: data.userTypes,
        });
      },
      error: () => {
        this.error = 'Error loading user type';
      },
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const payload: Partial<UserTypes> = this.form.value;

    if (this.isEditMode && this.userTypeId) {
      this.service.update(this.userTypeId, payload).subscribe({
        next: () => this.router.navigate(['/user-types']),
        error: () => {
          this.error = 'Error during update';
          this.loading = false;
        },
      });
    } else {
      this.service.create(payload).subscribe({
        next: () => this.router.navigate(['/user-types']),
        error: () => {
          this.error = 'Error during creation';
          this.loading = false;
        },
      });
    }
  }
}
