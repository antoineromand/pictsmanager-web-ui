import { Routes } from '@angular/router';
import { HomePage } from './app/pages/home-page/home-page';
import { LoginPage } from './app/pages/authentication/login-page/login-page';

export const routes: Routes = [
    { path: "", component: HomePage },
    { path: "login", component: LoginPage }
];