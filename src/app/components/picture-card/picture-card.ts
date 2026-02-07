import { Component, input } from '@angular/core';
import { HlmCardImports } from '@spartan-ng/helm/card';


@Component({
  selector: 'picture-card',
  imports: [HlmCardImports],
  templateUrl: './picture-card.html'
})
export class PictureCard {
  profilPicture = input<String>();
  username = input<String>();
  picture_url = input<String>();
  description = input<String>();

}
