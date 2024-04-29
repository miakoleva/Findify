import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDTO } from '../models/UserDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:8080/api'

  constructor(private http: HttpClient) {}

  registerUser(user: UserDTO){
    console.log("User is registered.")
    return this.http.post(`${this.url}/register`, user)
  }
}
