import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class SocialService {
    private likeApiUrl: string = environment.apiUrl + 'private/api/post';

    private httpClient = inject(HttpClient);

    setLikeOnPost(postId: number, state: boolean) {
        return this.httpClient.put<void>(`${this.likeApiUrl}/${postId}/like`, { state });
    }
}
