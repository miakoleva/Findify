import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login-modal/login-modal.component';
import { RegisterComponent } from './components/register-modal/register-modal.component';


export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'home/login', component: LoginComponent},
    {path: 'home/register', component: RegisterComponent},
    {path: '**', redirectTo: 'home'}
];
