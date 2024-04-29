import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // constructor(private http: HttpClient) { }

  // save(user: any) {
  //   this.http.post<void>('http://localhost:8080/api/register', user)
  //     .subscribe({
  //       next: () => {
  //         console.log('User signed up successfully');
  //         // Optionally, redirect the user to a different page
  //       },
  //       error: (err) => {
  //         console.error('Error signing up user:', err);
  //         // Handle error, e.g., display an error message to the user
  //       }
  //     });
  // }
}
