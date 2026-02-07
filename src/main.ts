import { Component, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppHeader } from './app/components/core/app-header/app-header';
import { provideRouter, RouterOutlet } from '@angular/router';
import { routes } from './app.routes';
import { AppFooter } from './app/components/core/app-footer/app-footer';

@Component({
	selector: 'app-root',
	template: `
	<app-header [isAuthenticated]="isAuthenticated()"></app-header>
	<router-outlet></router-outlet>
	<app-footer></app-footer>
  `,
	imports: [RouterOutlet, AppHeader, AppFooter],
})
export class App {
	name = 'Angular';
	isAuthenticated = signal(false);
}

bootstrapApplication(App, {
	providers: [provideRouter(routes)]
});
