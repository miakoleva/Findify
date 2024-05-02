import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Post } from '../../models/Post';
import { catchError, filter, map, mergeMap, of, tap } from 'rxjs';
import { PostService } from '../../services/post.service';
import { User } from '../../models/User';
import { Location } from '@angular/common';

@Component({
  selector: 'app-post-details-modal',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './post-details-modal.component.html',
  styleUrl: './post-details-modal.component.scss'
})
export class PostDetailsModalComponent implements OnInit {

  post: Post | undefined
  loading = false;
  error: any;
  currentUser: User = JSON.parse(localStorage.getItem('user')!!)

  constructor(private route: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap
            .pipe(
                filter((it) => it.has('id')),
                tap(() => {
                    this.loading = true;
                    this.error = null;
                }),
                map((paramsMap) => paramsMap.get('id')!),
                mergeMap((id) => this.postService.getPostById(+id)),
                catchError((error, c) => {
                    console.log('Error', error);
                    console.log('Caught', c);
                    this.error = error;
                    return of(undefined);
                })
            )
            .subscribe({
                next: (post) => {
                    this.post = post;
                    this.loading = false;
                },
                error: (error) => {
                    console.log('on ERROR', error);
                    this.post = undefined;
                    this.loading = false;
                    this.error = error;
                },
            });

  }

  approve() {
    console.log('approved')
    this.postService.approvePost(this.post!!).subscribe(() => {
      this.location.back()
    })
    
  }
  decline() {
    console.log('declined')
    this.postService.declinePost(this.post!!.id).subscribe(() => {
      this.location.back()
    })
    
  }
}
