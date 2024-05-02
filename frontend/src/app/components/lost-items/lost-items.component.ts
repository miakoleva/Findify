import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { PostDetailsModalComponent } from '../post-details-modal/post-details-modal.component';
import { FilterSectionComponent } from '../filter-section/filter-section.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lost-items',
  standalone: true,
  imports: [NavBarComponent, PostDetailsModalComponent, FilterSectionComponent, RouterLink],
  templateUrl: './lost-items.component.html',
  styleUrl: './lost-items.component.scss'
})
export class LostItemsComponent {
  arr = [1, 2, 3, 4, 5, 6]
}
