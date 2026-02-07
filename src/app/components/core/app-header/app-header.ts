import { Component, input } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLogIn, lucideLogOut } from '@ng-icons/lucide';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { RouterLink, RouterModule } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [HlmButtonImports, NgIcon, HlmIconImports, RouterLink, RouterModule],
  providers: [provideIcons({ lucideLogIn, lucideLogOut })],
  templateUrl: './app-header.html',
  styleUrl: './app-header.css',
})
export class AppHeader {
  isAuthenticated = input(false);
}
