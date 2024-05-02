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
import { CategoryService } from '../../services/category.service';

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
    private router: Router,
    private categoryService: CategoryService) { }


  ngOnInit(): void {
    this.getMunicipalities()
    this.getCategories()

    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      municipality: ['', Validators.required],
      image: ['', Validators.required],
      lostorfound: ['lost', Validators.required]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('image')?.setValue(file);
    }
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


    if(this.form.invalid){
      console.log(this.form)
      console.log("form is invalid")
      return;
    }
    
    console.log(this.form)

    let formData = new FormData();

    formData.append("title", this.form.get('title')!!.value)
    formData.append("category", this.form.get('category')!!.value)
    formData.append("description", this.form.get('description')!!.value)
    formData.append("municipality", this.form.get('municipality')!!.value)
    formData.append("image", this.form.get('image')!!.value)
    formData.append("state", state)

    this.service.addPost(formData).subscribe({
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

  categories: Category[] = []

  getCategories(){
    this.categoryService.getCategories().subscribe((it) => {
      this.categories = it;
    })
  }

}
