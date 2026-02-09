import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import type { GetUserProfileResponseInterface, UpdateUserProfileRequestInterface, UpdateUserProfileResponseInterface } from '../interfaces/user-profile.interface';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private apiUrl: string = environment.apiUrl + 'private/api/user/me/profile';

  private httpClient = inject(HttpClient);

  getUserProfil() {
    return this.httpClient.get<GetUserProfileResponseInterface>(this.apiUrl);
  }

  updateUserProfil(request: UpdateUserProfileRequestInterface) {
    return this.httpClient.put<UpdateUserProfileResponseInterface>(this.apiUrl, { ...request.payload });
  }
}
