import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { PostDetailsModalComponent } from '../post-details-modal/post-details-modal.component';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/Post';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-found-items',
  standalone: true,
  imports: [NavBarComponent, PostDetailsModalComponent, RouterLink],
  templateUrl: './found-items.component.html',
  styleUrl: './found-items.component.scss'
})
export class FoundItemsComponent implements OnInit {
  constructor(private postService: PostService) { }
  posts: Post[] = []

  ngOnInit(): void {
    this.postService.getFoundItems().subscribe((it) => {
      this.posts = it
    })
  }
}
