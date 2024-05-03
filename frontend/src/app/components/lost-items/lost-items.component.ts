import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { PostDetailsModalComponent } from '../post-details-modal/post-details-modal.component';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/Post';
import { RouterLink } from '@angular/router';
import { FilterSectionComponent } from '../filter-section/filter-section.component';
import { MatDialog } from '@angular/material/dialog';
import { PostDetailsDialogComponent } from '../post-details-dialog/post-details-dialog.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-lost-items',
  standalone: true,
  imports: [NavBarComponent, PostDetailsModalComponent, RouterLink, FilterSectionComponent, NgFor],
  templateUrl: './lost-items.component.html',
  styleUrl: './lost-items.component.scss'
})
export class LostItemsComponent {
  constructor(private postService: PostService, private dialog: MatDialog) { }
  posts: Post[] = []

  ngOnInit(): void {
    this.postService.getLostItems().subscribe((it) => {
      this.posts = it
    })
  }

  openDetailsDialog(post: any): void {
    const dialogRef = this.dialog.open(PostDetailsDialogComponent, {
      width: '600px',
      data: { post }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
