import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import type { LoginRequestInterface } from '../interfaces/authentication.interface';
import { HttpClient, type HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl: string = environment.apiUrl + 'public/api/auth/';

  private httpClient = inject(HttpClient);

  private _token = signal<string | null>(localStorage.getItem('token'));

  readonly isAuthenticated = computed(() => {
    const t = this._token();
    return !!t && t.length > 10;
  });

  login(request: LoginRequestInterface) {
    return this.httpClient.post<any>(this.apiUrl + "login", request, { observe: 'response' }).pipe(
      tap((res: HttpResponse<any>) => {
        const token = res.headers.get('Authorization');
        if (token) {
          localStorage.setItem('token', token);
          this._token.set(token);
        }
      })
    );
  }

  getIsAuthenticated() {
    const token = localStorage.getItem("token");
    if (!token) return false;
    else {
      if (token.length > 10) return true;
      return false;
    }
  }

  logout() {
    localStorage.removeItem('token');
    this._token.set(null);
  }
}
