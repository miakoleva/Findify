import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { PostDetailsModalComponent } from '../post-details-modal/post-details-modal.component';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/Post';
import { RouterLink } from '@angular/router';
import { FilterSectionComponent } from '../filter-section/filter-section.component';

@Component({
  selector: 'app-lost-items',
  standalone: true,
  imports: [NavBarComponent, PostDetailsModalComponent, RouterLink],
  templateUrl: './lost-items.component.html',
  styleUrl: './lost-items.component.scss'
})
export class LostItemsComponent {
  constructor(private postService: PostService) { }
  posts: Post[] = []

  ngOnInit(): void {
    this.postService.getLostItems().subscribe((it) => {
      this.posts = it
    })
  }
}
