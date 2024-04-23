import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RegisterComponent } from '../register-modal/register-modal.component';
import { HomeComponent } from '../home/home.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RegisterComponent, HomeComponent, NavBarComponent],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.scss'
})
export class LoginComponent {
  
}
