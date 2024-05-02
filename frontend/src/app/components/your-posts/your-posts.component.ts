import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/Post';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-your-posts',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './your-posts.component.html',
  styleUrl: './your-posts.component.scss'
})
export class YourPostsComponent implements OnInit {

  posts: Post[] = []
  currentUser: User = JSON.parse(localStorage.getItem('user')!!)

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPostsByUserId(this.currentUser.id).subscribe(it => {
      this.posts = it;
    })
  }


}
