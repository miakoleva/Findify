import { Component, OnInit } from '@angular/core';
import { MunicipalityService } from '../../services/municipality.service';
import { Municipality } from '../../models/Municipality';
import { NgFor } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostDTO } from '../../models/PostDTO';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss'
})
export class AddPostComponent implements OnInit {

  errorMessage: string = ''
  form!: FormGroup

  constructor(private municipalityService: MunicipalityService,
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
    const state = lostOrFoundValue ? 'PENDING_LOST' : 'PENDING_FOUND';

    const post: PostDTO = {
      title: data.title,
      category: data.category,
      description: data.description,
      municipality: data.municipality,
      image: data.image,
      state: state
    }

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
