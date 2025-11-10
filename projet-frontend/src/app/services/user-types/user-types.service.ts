import { HttpClient } from '@angular/common/http';
import { Injectable, numberAttribute } from '@angular/core';
import { Observable } from 'rxjs';
import { UserTypes } from '../../common/user-types-interface/user-types';

@Injectable({ providedIn: 'root' })
export class UserTypesService {
  private base = 'http://localhost:8042/api/user-types';
  id: number | undefined;

  constructor(private http: HttpClient) {}

  //Find all users
  getAll(): Observable<UserTypes[]> {
    return this.http.get<UserTypes[]>(this.base);
  }
  //Find users by id
  getById(id: number) {
    return this.http.get<UserTypes>(`${this.base}/${id}`);
  }

  //Create users
  create(payload: Partial<UserTypes>) {
    return this.http.post(this.base, payload);
  }

  //Update users
  update(id: number, payload: Partial<UserTypes>) {
    return this.http.put(`${this.base}/${id}`, payload);
  }

  //Delete users
  delete(id: number) {
    return this.http.delete(`${this.base}/${id}`);
  }
}
