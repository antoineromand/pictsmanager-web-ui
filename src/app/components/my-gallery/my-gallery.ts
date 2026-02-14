import { Component, effect, inject, input, signal, type OnInit } from '@angular/core';
import type { Media } from '../../interfaces/media.interface';
import { MediaService } from '../../services/media.service';
import { environment } from '../../../environments/environment';
import { toast } from 'ngx-sonner';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { lucideChevronLeftCircle, lucideChevronRightCircle } from '@ng-icons/lucide';



@Component({
  selector: 'my-gallery',
  imports: [HlmButtonImports, NgIcon, HlmIconImports],
  providers: [provideIcons({ lucideChevronRightCircle, lucideChevronLeftCircle })],
  templateUrl: './my-gallery.html'
})
export class MyGallery {
  list = signal<Media[]>([]);
  page = signal<number>(0);

  perPage = signal<number>(2);

  totalElements = signal<number>(0);

  selectedMedias = signal<String[]>([]);

  private mediaService = inject(MediaService);

  private maxSelectedItems = 2;

  constructor() {
    effect(() => {
      const page = this.page();
      const perPage = this.perPage();
      this.mediaService.getMedias(page, perPage).subscribe({
        next: (value) => {
          this.list.set(value.data.medias);
          this.totalElements.set(value.data.totalElements);
        }
      });
    });
  }

  next() {
    this.page.update(v => v + 1);
  }

  previous() {
    this.page.update(v => Math.max(0, v - 1));
  }

  clickOnMedia(media: Media) {
    const id = media.mediaId;

    if (this.selectedMedias().length === this.maxSelectedItems && !this.selectedMedias().includes(media.mediaId)) {
      toast.info("You have selected the maximum number of media items.");
    }

    this.selectedMedias.update(s =>
      s.includes(id)
        ? s.filter(x => x !== id)
        : s.length < this.maxSelectedItems
          ? [...s, id]
          : s
    );
  }

  getUrl(originalKey: string) {
    return environment.mediaUrl + originalKey;
  }

}
