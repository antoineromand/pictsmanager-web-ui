import { Component, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppHeader } from './app/components/core/app-header/app-header';
import { provideRouter, RouterOutlet } from '@angular/router';
import { routes } from './app.routes';
import { AppFooter } from './app/components/core/app-footer/app-footer';

@Component({
	selector: 'app-root',
	template: `
	<div class="min-h-screen flex flex-col">
		<app-header [isAuthenticated]="isAuthenticated()"></app-header>

		<main class="flex-1">
			<router-outlet></router-outlet>
		</main>

		<app-footer></app-footer>
	</div>
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
