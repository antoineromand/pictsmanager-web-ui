import { Component, inject, signal, type OnInit } from '@angular/core';
import { UserProfileService } from '../../services/user-profile.service';
import type { UpdateUserProfileRequestInterface, UserProfileInterface } from '../../interfaces/user-profile.interface';
import { MyProfile } from '../../components/my-profile/my-profile';

@Component({
  selector: 'profile-page',
  imports: [MyProfile],
  templateUrl: './profile-page.html'
})
export class ProfilePage implements OnInit {

  userProfileService = inject(UserProfileService);

  userProfil = signal<UserProfileInterface | null>(null);

  ngOnInit(): void {
    this.userProfileService.getUserProfil().subscribe({
      next: (res) => {
        this.userProfil.set(res.data);
      },
    });
  }

  updateUserProfil(data: UpdateUserProfileRequestInterface) {
    console.log(data);
    // this.userProfileService.updateUserProfil(data).subscribe({

    // });
  }

}
