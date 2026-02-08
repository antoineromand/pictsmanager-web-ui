import { HttpClient } from '@angular/common/http';
import { Component, inject, type OnInit } from '@angular/core';

@Component({
  selector: 'profile-page',
  imports: [],
  templateUrl: './profile-page.html'
})
export class ProfilePage implements OnInit {

  httpClient = inject(HttpClient);

  ngOnInit(): void {
    this.httpClient.get("http://localhost:4000/private/api/user/me/profil").subscribe({
      next: (res) => {
        console.log(res);
      }
    });
  }

}
