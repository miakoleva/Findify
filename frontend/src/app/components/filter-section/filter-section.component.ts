import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { MunicipalityService } from '../../services/municipality.service';
import { PostService } from '../../services/post.service';
import { Category } from '../../models/Category';
import { Municipality } from '../../models/Municipality';

@Component({
  selector: 'app-filter-section',
  standalone: true,
  imports: [RouterLink, HomeComponent],
  templateUrl: './filter-section.component.html',
  styleUrl: './filter-section.component.scss'
})
export class FilterSectionComponent implements OnInit{

  errorMessage: string = ''
  form!: FormGroup

  constructor(private municipalityService: MunicipalityService,
    private formBuilder: FormBuilder,
    private service: PostService,
    private router: Router,
    private categoryService: CategoryService) { }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.getMunicipalities()
    this.getCategories()
  }

  municipalities: Municipality[] = []

  getMunicipalities() {
    this.municipalityService.getMunicipalities().subscribe((it) => {
      this.municipalities = it;
    });
  }

  categories: Category[] = []

  getCategories() {
    this.categoryService.getCategories().subscribe((it) => {
      this.categories = it;
    })
  }

}
