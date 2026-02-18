import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import type { GetUserProfileResponseInterface, UpdateUserProfileRequestInterface, UpdateUserProfileResponseInterface } from '../interfaces/user-profile.interface';
import type { CreatePostRequestInterface } from '../interfaces/post.interface';

@Injectable({
    providedIn: 'root',
})
export class PostService {
    private apiUrl: string = environment.apiUrl + 'private/api/post';

    private httpClient = inject(HttpClient);

    createPost(request: CreatePostRequestInterface) {
        return this.httpClient.post<void>(this.apiUrl, request);
    }
}
