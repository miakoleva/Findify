import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../login-modal/login-modal.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, LoginComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  
}
