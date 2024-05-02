import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { PostDetailsModalComponent } from '../post-details-modal/post-details-modal.component';
import { Post } from '../../models/Post';
import { PostService } from '../../services/post.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pending',
  standalone: true,
  imports: [NavBarComponent, PostDetailsModalComponent, RouterLink],
  templateUrl: './pending.component.html',
  styleUrl: './pending.component.scss'
})
export class PendingComponent implements OnInit {

  posts: Post[] = []

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPendingPosts().subscribe((it) => {
      this.posts = it
    })
  }
}
