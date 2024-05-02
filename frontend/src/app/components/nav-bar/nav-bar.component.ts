import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginComponent } from '../login-modal/login-modal.component';
import { RegisterComponent } from '../register-modal/register-modal.component';
import { AddPostComponent } from '../add-post/add-post.component';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, LoginComponent, RegisterComponent, AddPostComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {

  loggedIn: boolean = false;
  currentUser: User | undefined

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {
    this.currentUser = this.userService.currentUser
   }

  ngOnInit() {
    this.loggedIn = this.authService.isLoggedIn();

    this.authService.getLoginStatus().subscribe((isLoggedIn) => {
      this.loggedIn = isLoggedIn;
    });
  }


  loggedin() {
    console.log(this.loggedIn)
  }
  logOut() {
    console.log('logging out')
    localStorage.removeItem('jwtToken')
    this.authService.updateLoginStatus(false);
    this.router.navigate(['/home']);

    this.authService.logout()
  }
}
