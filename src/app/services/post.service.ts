import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import type { GetUserProfileResponseInterface, UpdateUserProfileRequestInterface, UpdateUserProfileResponseInterface } from '../interfaces/user-profile.interface';
import type { CreatePostRequestInterface, PostData } from '../interfaces/post.interface';
import { GenericResponse } from '../interfaces/api.response';
import type { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PostService {
    private apiUrl: string = environment.apiUrl + 'private/api/post';

    private httpClient = inject(HttpClient);

    private _feed = signal<PostData[]>([]);

    readonly feed = this._feed.asReadonly();

    createPost(request: CreatePostRequestInterface) {
        return this.httpClient.post<void>(this.apiUrl, request);
    }

    getUserPost(): Observable<GenericResponse<PostData[]>> {
        return this.httpClient.get<GenericResponse<PostData[]>>(this.apiUrl + "/list");
    }

    getUserFeed() {
        this.httpClient.get<GenericResponse<PostData[]>>(this.apiUrl + "/feed").subscribe({
            next: (value) => this._feed.set(value.data)
        });
    }
}
