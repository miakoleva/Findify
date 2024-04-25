import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { PostDetailsModalComponent } from '../post-details-modal/post-details-modal.component';

@Component({
  selector: 'app-lost-items',
  standalone: true,
  imports: [NavBarComponent, PostDetailsModalComponent],
  templateUrl: './lost-items.component.html',
  styleUrl: './lost-items.component.scss'
})
export class LostItemsComponent {
  arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
}
