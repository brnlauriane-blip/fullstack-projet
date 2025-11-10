import { Routes } from '@angular/router';
import { UserTypesListComponent } from './user-types/user-types-list/user-types-list.component';
import { UserTypesFormComponent } from './user-types/user-types-form/user-types-form.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UsersFormComponent } from './users/users-form/users-form.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UsersDetailsComponent } from './users/users-details/users-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'user-types', component: UserTypesListComponent },
  { path: 'user-types/form', component: UserTypesFormComponent },
  { path: 'users', component: UsersListComponent },
  { path: 'users/form', component: UsersFormComponent },
  { path: 'users/profile/:id', component: UsersDetailsComponent },
  { path: '**', redirectTo: 'home' },
];
