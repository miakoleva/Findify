import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RegisterComponent } from '../register-modal/register-modal.component';
import { HomeComponent } from '../home/home.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { AbstractControl, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AuthenticationRequest } from '../../models/AuthenticationRequest';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RegisterComponent, HomeComponent, NavBarComponent, ReactiveFormsModule, NgIf, CommonModule],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.scss'
})
export class LoginComponent implements OnInit {

  errorMessage = ''
  submitted = false
  form!: FormGroup

  constructor(private formBuilder: FormBuilder,
    private auth: AuthService,
    private userSerivce: UserService,
    private router: Router){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', Validators.required]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void{

    this.errorMessage = ''
    this.submitted = true

    if(this.form.invalid){
      console.log('invalid form', this.form);
      return;
    }

    const data = this.form.value

    const user: AuthenticationRequest = {
      email: data.email,
      password: data.password
    }

    this.auth.loginUser(user).subscribe({
      next: (response: any) => {
        console.log("User is logged in")

        const loggedInUser: User | undefined = response.user; // Extract user object if available
          if (loggedInUser) {
            // User object exists, store it in the user service or local storage
            this.userSerivce.setCurrentUser(loggedInUser);
            localStorage.setItem("jwtToken", response.token)
            console.log(response.token)
            console.log(loggedInUser);
          }

        this.router.navigateByUrl('/home')
      },
      error: error => {
        this.errorMessage = error.error
        console.log("Error", error)
      }
    })
  }


}
