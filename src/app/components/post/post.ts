import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import type { PostData } from '../../interfaces/post.interface';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-post',
  imports: [DatePipe],
  templateUrl: './post.html',
})
export class Post {
  post = input<PostData>({
    id: 100,
    author: "James",
    caption: "This is a test",
    mediaRowReadModels: [
      { mediaId: "xxxx-xxxx-xxxx", key: "xxxx-xxx-xxxx", userId: 1 }
    ],
    likes: 10,
    created_at: "2026-02-17T21:31:51"
  });

  getUrl(originalKey: string) {
    return environment.mediaUrl + originalKey;
  }

  profileLayout = input<boolean>(false);
}
