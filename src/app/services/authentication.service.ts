import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import type { LoginRequestInterface, RegisterRequestInterface } from '../interfaces/authentication.interface';
import { HttpClient, type HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl: string = environment.apiUrl + 'public/api/auth/';

  private httpClient = inject(HttpClient);

  private router = inject(Router);


  private _token = signal<string | null>(localStorage.getItem('access_token'));

  readonly isAuthenticated = computed(() => {
    const t = this._token();
    return !!t && t.length > 10;
  });

  login(request: LoginRequestInterface) {
    return this.httpClient.post<any>(this.apiUrl + "login", request, { observe: 'response', withCredentials: true }).pipe(
      tap((res: HttpResponse<any>) => {
        const token = res.headers.get('Authorization');
        if (token) {
          localStorage.setItem('access_token', token);
          this._token.set(token);
          this.router.navigate(["/profile"]);
        }
      })
    );
  }

  register(request: RegisterRequestInterface) {
    return this.httpClient.post(this.apiUrl + "register", request);
  }

  getIsAuthenticated() {
    const token = localStorage.getItem("access_token");
    if (!token) return false;
    else {
      if (token.length > 10) return true;
      return false;
    }
  }

  getToken() {
    return this._token();
  }

  logout() {
    localStorage.removeItem('access_token');
    this._token.set(null);
    return this.httpClient.post<any>(this.apiUrl + "logout", {}).subscribe(
      {
        next: () => {
          toast.info("You have been logged out.");
        }, error: (err) => {
          toast.error("An error occured while user tried to logged out");
        }
      }
    );
  }

  refreshToken() {
    return this.httpClient
      .post<any>(this.apiUrl + 'refresh', null, {
        observe: 'response',
        withCredentials: true,
      })
      .pipe(
        tap((res: HttpResponse<any>) => {
          const token = res.headers.get('Authorization');
          if (token) {
            localStorage.setItem('access_token', token);
            this._token.set(token);
          }
        })
      );
  }
}
