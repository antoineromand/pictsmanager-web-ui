import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import type { GetUserProfileResponseInterface, UpdateUserProfileRequestInterface, UpdateUserProfileResponseInterface } from '../interfaces/user-profile.interface';
import type { CreatePostRequestInterface, PostData } from '../interfaces/post.interface';
import { GenericResponse } from '../interfaces/api.response';

@Injectable({
    providedIn: 'root',
})
export class PostService {
    private apiUrl: string = environment.apiUrl + 'private/api/post';

    private httpClient = inject(HttpClient);

    createPost(request: CreatePostRequestInterface) {
        return this.httpClient.post<void>(this.apiUrl, request);
    }

    getUserPost() {
        return this.httpClient.get<GenericResponse<PostData[]>>(this.apiUrl + "/list");
    }
}
