import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetUserResponse } from '../models/GetUserResponse';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:8080/api/user'

  constructor() { }

  currentUser: User | undefined

  setCurrentUser(user: User) {
    this.currentUser = user;
  }

  getCurrentUser(): User {
    return this.currentUser!!;
  }

}
