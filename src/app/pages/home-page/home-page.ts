import { Component } from '@angular/core';
import { HomeBanner } from '../../components/home-banner/home-banner';
import { PictureCard } from '../../components/picture-card/picture-card';

@Component({
  selector: 'home-page',
  imports: [HomeBanner, PictureCard],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {

}
