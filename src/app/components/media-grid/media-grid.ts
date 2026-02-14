import { Component, effect, inject, input, signal, type OnInit } from '@angular/core';
import type { Media } from '../../interfaces/media.interface';
import { MediaService } from '../../services/media.service';
import { environment } from '../../../environments/environment';
import { toast } from 'ngx-sonner';



@Component({
  selector: 'media-grida',
  imports: [],
  templateUrl: './media-grid.html'
})
export class MediaGrid {
  list = signal<Media[]>([]);
  offset = signal<number>(0);

  limit = signal<number>(1);

  totalElements = signal<number>(0);

  selectedMedias = signal<String[]>([]);

  private mediaService = inject(MediaService);

  private maxSelectedItems = 2;

  constructor() {
    effect(() => {
      console.log("hey");
      const offset = this.offset();
      const limit = this.limit();
      this.mediaService.getMedias(offset, limit).subscribe({
        next: (value) => {
          this.list.set(value.data.medias);
          this.totalElements.set(value.data.totalElements);
        }
      });
    });
  }

  next() {
    if (this.offset() >= this.totalElements()) {
      return;
    }
    this.offset.update((value) => value + this.limit());
  }

  previous() {
    if (this.offset() === 0) {
      return;
    }
    this.offset.update(value =>
      Math.max(0, value - this.limit())
    );
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
