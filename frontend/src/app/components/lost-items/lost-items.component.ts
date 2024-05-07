import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { PostDetailsModalComponent } from '../post-details-modal/post-details-modal.component';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/Post';
import { RouterLink } from '@angular/router';
import { FilterSectionComponent } from '../filter-section/filter-section.component';
import { MatDialog } from '@angular/material/dialog';
import { PostDetailsDialogComponent } from '../post-details-dialog/post-details-dialog.component';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Category } from '../../models/Category';
import { Municipality } from '../../models/Municipality';
import { MunicipalityService } from '../../services/municipality.service';
import { CategoryService } from '../../services/category.service';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-lost-items',
  standalone: true,
  imports: [NavBarComponent, PostDetailsModalComponent, RouterLink, FilterSectionComponent, NgFor, ReactiveFormsModule, NgIf],
  templateUrl: './lost-items.component.html',
  styleUrl: './lost-items.component.scss'
})
export class LostItemsComponent {
  constructor(
    private postService: PostService,
    private municipalityService: MunicipalityService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private filterService: FilterService
  ) { }

  posts: Post[] = [];
  filtered: Post[] = [];
  
  form!: FormGroup;
  filter = false;

  ngOnInit(): void {
    this.getMunicipalities();
    this.getCategories();

    this.form = this.formBuilder.group({
      title: '',
      category: '',
      municipality: ''
    });
    this.getLostItems();
  }


  onSubmitFilter(): void {
    this.filter = true;
    if (this.form.invalid) {
      console.log("Form is invalid");
      return;
    }
  
    const formData = new FormData();
    formData.append("title", this.form.get('title')?.value || '');
    formData.append("category", this.form.get('category')?.value || '');
    formData.append("municipality", this.form.get('municipality')?.value || '');
    formData.append("state", "ACTIVE_LOST")
  
    this.filterService.filterPosts(formData).subscribe((filteredPosts) => {
      this.filtered = filteredPosts;
    });
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
  getLostItems(): void {
    this.postService.getLostItems().subscribe((lostItems) => {
      this.posts = lostItems;
    });
  }

  reloadPage() {
    window.location.reload();
  }

}
