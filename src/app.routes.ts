import { Routes } from '@angular/router';
import { HomePage } from './app/pages/home-page/home-page';
import { LoginPage } from './app/pages/authentication/login-page/login-page';
import { AboutMe } from './app/pages/about-me/about-me';

export const routes: Routes = [
    { path: "", component: HomePage },
    { path: "login", component: LoginPage },
    { path: "about", component: AboutMe }
];