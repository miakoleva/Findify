import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

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
      firstName: '',
      lastName: '',
      phoneNumber: '',
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
    
    console.log(this.form)

    let formData = new FormData();

    formData.append("firstname", this.form.get('firstName')!!.value)
    formData.append("lastName", this.form.get('lastName')!!.value)
    formData.append("phoneNumber", this.form.get('phoneNumber')!!.value)
    formData.append("password", this.form.get('password')!!.value)

    this.userService.updateUser(this.currentUser!!.id, formData).subscribe({
      next: (data) => {
        this.currentUser = data
        console.log(data)
        this.authService.setCurrentUser(this.currentUser!!)
        localStorage.removeItem('user')
        localStorage.setItem('user', JSON.stringify(this.currentUser))
        this.router.navigateByUrl('/profile')
      }
    })
  }
}
