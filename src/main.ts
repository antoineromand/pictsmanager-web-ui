import { Component, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppHeader } from './app/components/app-header/app-header';

@Component({
	selector: 'app-root',
	template: `
	<app-header [isAuthenticated]="isAuthenticated()"><app-header>
  `,
	imports: [AppHeader],
})
export class App {
	name = 'Angular';
	isAuthenticated = signal(false);
}

bootstrapApplication(App);
