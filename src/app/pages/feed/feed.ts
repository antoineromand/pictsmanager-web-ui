import { Component, inject, signal, type OnInit } from '@angular/core';
import { Post } from '../../components/post/post';
import { PostService } from '../../services/post.service';
import { PostData } from '../../interfaces/post.interface';
import { SocialService } from '../../services/social.service';
import { catchError, EMPTY, map, switchMap } from 'rxjs';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'feed',
  imports: [Post],
  templateUrl: './feed.html'
})
export class Feed {
  postService = inject(PostService);
  socialService = inject(SocialService);
  feed = this.postService.feed;
  constructor() {
    this.postService.getUserFeed();
  }

  toggleLikeBtn(data: { postId: number, state: boolean; }) {
    this.socialService.setLikeOnPost(data.postId, data.state).pipe(
      map(() => this.postService.getUserFeed()),
      catchError(() => {
        toast.error("Impossible de mettre à jour le like.");
        return EMPTY;
      })
    ).subscribe();
  }
}
