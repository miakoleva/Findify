import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { UserDTO } from '../../models/UserDTO';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.scss'
})
export class UpdateProfileComponent implements OnInit {

  currentUser: User | undefined
  form!: FormGroup

  constructor(private authService: AuthService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('user')!!)
  }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
    })

    this.form = this.formBuilder.group({
      firstName: this.currentUser?.firstName,
      lastName: this.currentUser?.lastName,
      phoneNumber: this.currentUser?.phoneNumber,
      password: '',
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  update() {
    if(this.form.invalid){
      console.log(this.form)
      console.log("form is invalid")
      return;
    }

    const userData: UserDTO = {
      firstName: this.form.get('firstName')!!.value,
      lastName: this.form.get('lastName')!!.value,
      phoneNumber: this.form.get('phoneNumber')!!.value,
      password: this.form.get('password')!!.value,
      email: this.currentUser!!.email
    }

    this.userService.updateUser(this.currentUser!!.id, userData).subscribe({
      next: (data) => {
        this.authService.setCurrentUser(data)
        this.router.navigateByUrl(`profile/${this.currentUser?.id}`)
      }
    })
    
  }
}
