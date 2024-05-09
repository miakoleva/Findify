import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router, RouterLink } from '@angular/router';
import { Post } from '../../models/Post';
import { catchError, filter, map, mergeMap, of, tap } from 'rxjs';
import { PostService } from '../../services/post.service';
import { User } from '../../models/User';
import { Location } from '@angular/common';
import { MapComponent } from '../map/map.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../models/Comment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-post-details-modal',
  standalone: true,
  imports: [RouterLink, MapComponent, ReactiveFormsModule],
  templateUrl: './post-details-modal.component.html',
  styleUrl: './post-details-modal.component.scss'
})
export class PostDetailsModalComponent implements OnInit {

  post: Post | undefined
  postId: number | undefined
  loading = false;
  error: any;
  currentUser: User = JSON.parse(localStorage.getItem('user')!!)
  form!: FormGroup
  comments: Comment[] = []

  constructor(private route: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder,
    private commentService: CommentService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
      this.loadPost()
      this.buildForm()
      console.log(this.post?.id)
      this.commentService.getCommentsForPost(this.postId!!).subscribe((it) => {
        this.comments = it;
      })

  }

  loadPost() {
    this.route.paramMap
      .pipe(
        filter((it) => it.has('id')),
        tap(() => {
          this.loading = true;
          this.error = null;
        }),
        map((paramsMap) => paramsMap.get('id')!),
        tap(id => this.postId = +id),
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
          this.post!!.flag = false;
          this.loading = false;
          this.postService.getPostImage(post?.id!).subscribe((imageData) => {
            const imageUrl = URL.createObjectURL(new Blob([imageData]));
            post!.image = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
          })
        },
        error: (error) => {
          console.log('on ERROR', error);
          this.post = undefined;
          this.loading = false;
          this.error = error;
        },
      });
  }

  buildForm() {
    this.form = this.formBuilder.group({
      comment: ['', Validators.required]
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

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  postComment() {
    if(this.form.invalid){
      console.log(this.form)
      console.log("form is invalid")
      return;
    }
    

    let formData = new FormData();

    formData.append("comment", this.form.get('comment')!!.value)
    formData.append("postId", this.post!!.id.toString())
    formData.append("userId", this.currentUser.id.toString())
    

    this.commentService.addComment(formData).subscribe({
      next: (comment) => {
        this.form.get('comment')!.reset();
        this.comments.push(comment);
      },
      error: error => {
        this.error = error.error
        console.log("Error", error)
      }
    })
  }

  goBack(): void{
    this.location.back();
  }
}
