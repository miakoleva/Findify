import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RegisterComponent } from '../register-modal/register-modal.component';
import { HomeComponent } from '../home/home.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { AbstractControl, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AuthenticationRequest } from '../../models/AuthenticationRequest';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RegisterComponent, HomeComponent, NavBarComponent, ReactiveFormsModule],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.scss'
})
export class LoginComponent implements OnInit {

  errorMessage = ''
  submitted = false
  form!: FormGroup

  constructor(private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
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
      next: () => {
        console.log("User is logged in")
        this.router.navigateByUrl('/home')
      },
      error: error => {
        this.errorMessage = error.error
        console.log("Error", error)
      }
    })
  }


}
