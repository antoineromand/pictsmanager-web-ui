import { Component, input, output } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLogIn, lucideLogOut, lucideSquarePlus } from '@ng-icons/lucide';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { RouterLink, RouterModule } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [HlmButtonImports, NgIcon, HlmIconImports, RouterLink, RouterModule],
  providers: [provideIcons({ lucideLogIn, lucideLogOut, lucideSquarePlus })],
  templateUrl: './app-header.html'
})
export class AppHeader {
  isAuthenticated = input(false);
  closeEvent = output<boolean>();

  logout() {
    this.closeEvent.emit(true);
  }
}
