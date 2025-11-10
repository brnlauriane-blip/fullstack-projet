import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../../common/users-interface/users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = 'http://localhost:8042/api/users';
    getUserById: any;

  constructor(private http: HttpClient) {}

  //Find all users
  getAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.apiUrl);
  }
  //Find users by id and names
  getUsersById(id: number): Observable<Users> {
    return this.http.get<Users>(`${this.apiUrl}/${id}`);
  }

  getUsersByLastName(lastName: string): Observable<Users> {
    return this.http.get<Users>(`${this.apiUrl}/lastname/${lastName}`);
  }

  getUsersByFirstName(firstName: string): Observable<Users> {
    return this.http.get<Users>(`${this.apiUrl}/firstname/${firstName}`);
  }

  //Create users
  createUsers(user: Partial<Users>): Observable<Users> {
    return this.http.post<Users>(this.apiUrl, user);
  }

  //Update users
  updateUsers(id: number, user: Partial<Users>): Observable<Users> {
    return this.http.put<Users>(`${this.apiUrl}/${id}`, user);
  }

  //Delete users
  deleteUsers(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
