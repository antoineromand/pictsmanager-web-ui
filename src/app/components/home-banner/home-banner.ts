import { Component } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmIconImports } from '@spartan-ng/helm/icon';

@Component({
  selector: 'home-banner',
  imports: [HlmButtonImports, HlmIconImports, NgIcon],
  templateUrl: './home-banner.html',
})
export class HomeBanner {

}
