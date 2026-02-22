import { DatePipe, NgStyle, NgClass } from '@angular/common';
import { Component, effect, input, output, signal, type OnInit } from '@angular/core';
import type { PostData } from '../../interfaces/post.interface';
import { environment } from '../../../environments/environment';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { lucideHeart } from '@ng-icons/lucide';
import { HlmToggleImports } from '@spartan-ng/helm/toggle';


@Component({
  selector: 'app-post',
  imports: [DatePipe, NgIcon, HlmIconImports, HlmToggleImports],
  providers: [provideIcons({ lucideHeart })],
  templateUrl: './post.html',
})
export class Post implements OnInit {
  post = input<PostData>();

  isLikeBtnActive = signal<boolean>(false);

  toggleLikeBtnOutput = output<{ postId: number, state: boolean; }>();

  ngOnInit() {
    this.isLikeBtnActive.set(this.post()?.isLikedByUser as boolean);
  }

  getUrl(originalKey: string | undefined) {
    return environment.mediaUrl + originalKey;
  }

  likeBtnPressed() {
    this.isLikeBtnActive.update((state) => !state);
    this.toggleLikeBtnOutput.emit({ postId: this.post()?.id as number, state: this.isLikeBtnActive() });
  }

  getMediaSize() {
    return this.post()?.mediaRowReadModels?.length ?? 0;
  }

  profileLayout = input<boolean>(false);
}
