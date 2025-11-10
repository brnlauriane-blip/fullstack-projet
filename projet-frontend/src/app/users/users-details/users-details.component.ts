import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { Users } from "../../common/users-interface/users";
import { UsersService } from "../../services/users/users.service";

@Component({
  selector: 'app-users-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.css'],
})
export class UsersDetailsComponent implements OnInit {
user?: Users;
  loading = false;
  error = '';

  constructor(private route: ActivatedRoute, private service: UsersService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(id)) {
      this.error = 'Invalid user ID';
      return;
    }

    this.loading = true;
    this.service.getUsersById(id).subscribe({
      next: (data: Users | undefined) => {
        this.user = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error loading user profile';
        this.loading = false;
      }
    });
  }
}