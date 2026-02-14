import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import type { MediaListRequestInterface } from '../interfaces/media.interface';

@Injectable({
    providedIn: 'root',
})
export class MediaService {
    private apiUrl: string = environment.apiUrl + 'private/api/media';

    private httpClient = inject(HttpClient);

    getMedias(offset: number, limit: number) {
        return this.httpClient.get<{ data: MediaListRequestInterface; }>(this.apiUrl + "/list", {
            params: {
                offset,
                limit
            }
        });
    }
}
