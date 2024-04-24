import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { PostDetailsModalComponent } from '../post-details-modal/post-details-modal.component';

@Component({
  selector: 'app-found-items',
  standalone: true,
  imports: [NavBarComponent, PostDetailsModalComponent],
  templateUrl: './found-items.component.html',
  styleUrl: './found-items.component.scss'
})
export class FoundItemsComponent {
  arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
}
