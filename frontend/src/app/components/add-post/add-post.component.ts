import { Component, OnInit } from '@angular/core';
import { MunicipalityService } from '../../services/municipality.service';
import { Municipality } from '../../models/Municipality';
import { NgFor } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostDTO } from '../../models/PostDTO';
import { PostService } from '../../services/post.service';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HomeComponent } from '../home/home.component';
import { Category } from '../../models/Category';
import { PostStatus } from '../../models/PostStatus';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, HomeComponent, RouterLink],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss'
})
export class AddPostComponent implements OnInit {

  errorMessage: string = ''
  form!: FormGroup

  constructor(private municipalityService: MunicipalityService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private service: PostService,
    private router: Router) { }


  ngOnInit(): void {
    this.getMunicipalities()

    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      municipality: ['', Validators.required],
      lostorfound: ['lost', Validators.required]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }


  onSubmit() {
    const data = this.form.value
    this.errorMessage = ''

    const lostOrFoundValue = this.form.get('lostorfound')!!.value;
    const state = lostOrFoundValue ? "PENDING_LOST" : "PENDING_FOUND";

    const municipality: Municipality = {
      id: 1,
      name: data.municipality
    }
    const category: Category = {
      id: 1,
      categoryName: data.category
    }

    const post: PostDTO = {
      title: data.title,
      category: category,
      description: data.description,
      municipality: municipality,
      //image: data.image,
      state: state,
      user: this.userService.currentUser!!
    }
    
    console.log(post)

    this.service.addPost(post).subscribe({
      next: () => {
        this.router.navigateByUrl('/home')
      },
      error: error => {
        this.errorMessage = error.error
        console.log("Error", error)
      }
    })
  }

  municipalities: Municipality[] = []

  getMunicipalities() {
    this.municipalityService.getMunicipalities().subscribe((it) => {
      this.municipalities = it;
    });
  }

}
