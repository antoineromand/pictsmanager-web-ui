import { Component, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppHeader } from './app/components/app-header/app-header';
import { provideRouter, RouterOutlet } from '@angular/router';
import { routes } from './app.routes';

@Component({
	selector: 'app-root',
	template: `
	<app-header [isAuthenticated]="isAuthenticated()"></app-header>
	<router-outlet></router-outlet>
  `,
	imports: [RouterOutlet, AppHeader],
})
export class App {
	name = 'Angular';
	isAuthenticated = signal(false);
}

bootstrapApplication(App, {
	providers: [provideRouter(routes)]
});
