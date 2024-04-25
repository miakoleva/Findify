import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/User';
import { FormsModule, NgModel } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register-modal.component.html',
  styleUrl: './register-modal.component.scss'
})
export class RegisterComponent implements OnInit {

  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string;
  phoneNumber!: string;

  constructor(private router: Router,
    private http: HttpClient,
    private userService: UserService
  ) { }


  ngOnInit(): void {
    const myModal = document.getElementById('signupModal');
    myModal?.addEventListener('hidden.bs.modal', () => {
      this.router.navigate(['/home'])
    });
  }

  submitForm() {
    // const user = {
    //   firstName: this.firstName,
    //   lastName: this.lastName,
    //   phoneNumber: this.phoneNumber,
    //   email: this.email,
    //   password: this.password,
    //   role: "USER"
    // };

    const user = {
      "role": "User",
      "firstName": this.firstName,
      "lastName": this.lastName,
      "email": this.email,
      "password": this.password,
      "phoneNumber": this.phoneNumber
    };

    this.userService.save(user)

  }

}
