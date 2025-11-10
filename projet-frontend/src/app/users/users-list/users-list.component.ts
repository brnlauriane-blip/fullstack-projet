import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users/users.service';
import { Users } from '../../common/users-interface/users';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  list: Users[] = [];
  sortColumn: keyof Users | 'userTypes' = 'id';
  sortAsc = true;
  loading = false;
  error = '';

  constructor(private service: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.service.getAllUsers().subscribe({
      next: (data: Users[]) => {
        this.list = data;
        this.sortData();
        this.loading = false;
      },
      error: () => {
        this.error = 'Error loading users';
        this.loading = false;
      },
    });
  }

  sortData(): void {
    this.list.sort((a, b) => {
      const valA = this.getSortValue(a);
      const valB = this.getSortValue(b);
      return valA < valB ? (this.sortAsc ? -1 : 1) : valA > valB ? (this.sortAsc ? 1 : -1) : 0;
    });
  }

  getSortValue(item: Users): string | number {
    if (this.sortColumn === 'userTypes') return item.userTypes?.userTypes.toLowerCase() || '';
    const value = item[this.sortColumn as keyof Users];
    return typeof value === 'string' || typeof value === 'number' ? value : '';
  }

  sortBy(column: keyof Users | 'userTypes'): void {
    this.sortAsc = this.sortColumn === column ? !this.sortAsc : true;
    this.sortColumn = column;
    this.sortData();
  }

  edit(user: Users): void {
    this.router.navigate(['/users/form'], { queryParams: { id: user.id } });
  }

  deleteUsers(user: Users): void {
    if (!confirm(`Delete user "${user.firstName} ${user.lastName}" ?`)) return;

    this.service.deleteUsers(user.id!).subscribe({
      next: () => this.loadUsers(),
      error: () => alert('Error during deletion'),
    });
  }
}
