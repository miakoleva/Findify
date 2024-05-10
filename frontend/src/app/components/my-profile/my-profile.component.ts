import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss'
})
export class MyProfileComponent implements OnInit {
  currentUser: User | undefined

  constructor(private authService: AuthService) {
    this.currentUser = JSON.parse(localStorage.getItem('user')!!)
  }

 ngOnInit() {
   this.authService.getCurrentUser().subscribe((user) => {
     this.currentUser = user;
   })
 }
}
