import { Component, inject, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppHeader } from './app/components/core/app-header/app-header';
import { provideRouter, Router, RouterOutlet } from '@angular/router';
import { routes } from './app.routes';
import { AppFooter } from './app/components/core/app-footer/app-footer';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthenticationService } from './app/services/authentication.service';
import { HlmToasterImports } from '@spartan-ng/helm/sonner';
import { authInterceptor } from './app/interceptors/auth-interceptor-interceptor';

@Component({
	selector: 'app-root',
	template: `
	<div class="min-h-screen flex flex-col">
		<app-header [isAuthenticated]="authenticationService.isAuthenticated()" (closeEvent)="cleanToken($event)"></app-header>
		<main class="flex-1">
			<router-outlet></router-outlet>
		</main>

		<app-footer></app-footer>
		<hlm-toaster 
		position="bottom-right"
		expand
		richColors
		/>
	</div>
  `,
	imports: [RouterOutlet, AppHeader, AppFooter, HlmToasterImports],
})
export class App {
	authenticationService = inject(AuthenticationService);
	router = inject(Router);
	name = 'Angular';

	cleanToken(event: boolean) {
		this.authenticationService.logout();
		this.router.navigate([""]);
	}
}

bootstrapApplication(App, {
	providers: [provideRouter(routes), provideHttpClient(withInterceptors([authInterceptor]))]
});
