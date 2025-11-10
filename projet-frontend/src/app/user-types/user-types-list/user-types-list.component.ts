import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserTypesService } from '../../services/user-types/user-types.service';
import { UserTypes } from '../../common/user-types-interface/user-types';

@Component({
  selector: 'app-user-types-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-types-list.component.html',
  styleUrls: ['./user-types-list.component.css'],
})
export class UserTypesListComponent implements OnInit {
  list: UserTypes[] = [];
  filtered: UserTypes[] = [];
  sortColumn: 'id' | 'userTypes' = 'id';
  sortAsc = true;
  loading = false;
  error = '';


  constructor(private service: UserTypesService, private router: Router) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.service.getAll().subscribe({
      next: (data) => {
        this.list = data;
        this.applySorting();
        this.loading = false;
      },
      error: () => {
        this.error = 'Error loading jobs';
        this.loading = false;
      },
    });
  }

  applySorting() {
    let data = [...this.list];

    data.sort((a, b) => {
      const valA = this.sortColumn === 'id' ? a.id! : a.userTypes.toLowerCase();
      const valB = this.sortColumn === 'id' ? b.id! : b.userTypes.toLowerCase();
      if (valA < valB) return this.sortAsc ? -1 : 1;
      if (valA > valB) return this.sortAsc ? 1 : -1;
      return 0;
    });

    this.filtered = data;
  }

  sortBy(column: 'id' | 'userTypes') {
    if (this.sortColumn === column) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortColumn = column;
      this.sortAsc = true;
    }
    this.applySorting();
  }

  edit(item: UserTypes) {
    this.router.navigate(['/user-types/form'], { queryParams: { id: item.id } });
  }

  delete(item: UserTypes) {
    if (!confirm(`Delete "${item.userTypes}" ?`)) return;
    this.service.delete(item.id!).subscribe({
      next: () => this.load(),
      error: () => alert('Error during deletion'),
    });
  }
}
