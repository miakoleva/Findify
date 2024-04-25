import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LostItemsComponent } from './components/lost-items/lost-items.component';
import { FoundItemsComponent } from './components/found-items/found-items.component';


export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'home/login', component: HomeComponent },
    {path: 'home/register', component: HomeComponent},
    { path: 'lost-items', component: LostItemsComponent },
    { path: 'found-items', component: FoundItemsComponent },
    { path: '**', redirectTo: 'home' }
];
