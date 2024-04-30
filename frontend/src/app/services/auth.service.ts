import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDTO } from '../models/UserDTO';
import { AuthenticationRequest } from '../models/AuthenticationRequest';
import { AuthenticationResponse } from '../models/AuthenticationResponse';
import { catchError, tap, throwError } from 'rxjs';
import moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:8080/api'

  constructor(private http: HttpClient) { }

  registerUser(user: UserDTO) {
    console.log("User is registered.")
    return this.http.post(`${this.url}/register`, user)
  }

  loginUser(req: AuthenticationRequest) {
    return this.http.post<AuthenticationResponse>(`${this.url}/login`, req).pipe(
      tap(it => {this.setSession(it)}),
      catchError(error => throwError(() => new Error(error.error)))
    )
  }

  logout() {
    localStorage.removeItem("jwtToken")
    localStorage.removeItem("expires_at")
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration())
  }

  private setSession(authResult: AuthenticationResponse) {
    const expiresAt = moment(authResult.expiresIn)

    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()))
    localStorage.setItem('jwtToken', authResult.jwt)
  }

  private getExpiration() {
    const expiration = localStorage.getItem("expires_at")
    if (expiration != null) {
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
    }
    return null
  }

}



