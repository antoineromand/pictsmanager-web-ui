import { Routes } from '@angular/router';
import { HomePage } from './app/pages/home-page/home-page';
import { LoginPage } from './app/pages/authentication/login-page/login-page';
import { AboutMe } from './app/pages/about-me/about-me';
import { RegisterPage } from './app/pages/authentication/register-page/register-page';
import { authGuard } from './app/guards/auth-guard';
import { guestOnlyGuard } from './app/guards/guest-only-guard';
import { ProfilePage } from './app/pages/profile-page/profile-page';
import { Post } from './app/pages/post/post';
import { Feed } from './app/pages/feed/feed';

export const routes: Routes = [
    { path: "", component: HomePage, canActivate: [guestOnlyGuard] },
    { path: "login", component: LoginPage, canActivate: [guestOnlyGuard] },
    { path: "register", component: RegisterPage, canActivate: [guestOnlyGuard] },
    { path: "about", component: AboutMe, canActivate: [guestOnlyGuard] },
    { path: "feed", component: Feed, canActivate: [authGuard] },
    { path: "profile", component: ProfilePage, canActivate: [authGuard] },
    { path: "post", component: Post, canActivate: [authGuard] }
];