import { Component, inject, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppHeader } from './app/components/core/app-header/app-header';
import { provideRouter, RouterOutlet } from '@angular/router';
import { routes } from './app.routes';
import { AppFooter } from './app/components/core/app-footer/app-footer';
import { provideHttpClient } from '@angular/common/http';
import { AuthenticationService } from './app/services/authentication.service';

@Component({
	selector: 'app-root',
	template: `
	<div class="min-h-screen flex flex-col">
		<app-header [isAuthenticated]="authenticationService.isAuthenticated()" (closeEvent)="cleanToken($event)"></app-header>

		<main class="flex-1">
			<router-outlet></router-outlet>
		</main>

		<app-footer></app-footer>
	</div>
  `,
	imports: [RouterOutlet, AppHeader, AppFooter],
})
export class App {
	authenticationService = inject(AuthenticationService);
	name = 'Angular';

	cleanToken(event: boolean) {
		this.authenticationService.logout();
	}
}

bootstrapApplication(App, {
	providers: [provideRouter(routes), provideHttpClient()]
});
