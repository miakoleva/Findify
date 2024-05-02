import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LostItemsComponent } from './components/lost-items/lost-items.component';
import { FoundItemsComponent } from './components/found-items/found-items.component';
import { RegisterComponent } from './components/register-modal/register-modal.component';
import { LoginComponent } from './components/login-modal/login-modal.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { PendingComponent } from './components/pending/pending.component';
import { YourPostsComponent } from './components/your-posts/your-posts.component';


export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: RegisterComponent},
    { path: 'lost-items', component: LostItemsComponent },
    { path: 'found-items', component: FoundItemsComponent },
    { path: 'add-post', component: AddPostComponent},
    { path: 'pending', component: PendingComponent},
    { path: 'your-posts', component: YourPostsComponent },
    { path: '**', redirectTo: 'home' }
];
