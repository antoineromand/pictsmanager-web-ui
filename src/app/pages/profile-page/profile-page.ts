import { Component, inject, signal, type OnInit } from '@angular/core';
import { UserProfileService } from '../../services/user-profile.service';
import type { UpdateUserProfileRequestInterface, UserProfileInterface } from '../../interfaces/user-profile.interface';
import { MyProfile } from '../../components/my-profile/my-profile';
import { toast } from 'ngx-sonner';
import { HlmItemImports } from '@spartan-ng/helm/item';
import { HlmSpinnerImports } from '@spartan-ng/helm/spinner';
import { Post } from '../../components/post/post';
import { PostData } from '../../interfaces/post.interface';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'profile-page',
  imports: [MyProfile, HlmItemImports, HlmSpinnerImports, Post],
  templateUrl: './profile-page.html'
})
export class ProfilePage implements OnInit {

  userProfileService = inject(UserProfileService);
  postService = inject(PostService);

  userProfil = signal<UserProfileInterface | null>(null);

  userPosts = signal<PostData[]>([]);

  isProcessing = signal<boolean>(false);


  ngOnInit(): void {
    this.userProfileService.getUserProfil().subscribe({
      next: (res) => {
        this.userProfil.set(res.data);
      },
    });
    this.postService.getUserPost().subscribe({
      next: (value) => {
        console.log(value);
        this.userPosts.set(value.data);
      }
    });
  }

  update(data: UpdateUserProfileRequestInterface) {
    this.userProfileService.updateUserProfil(data).subscribe({
      next: (response) => {
        this.userProfil.update(current => {
          if (!current) return current;

          return {
            ...current,
            description: response.data.description ?? current.description,
            picture: response.data.picture ?? current.picture,
            coverPicture: response.data.coverPicture ?? current.coverPicture,
          };
        });

        toast.success("Your profile has been updated.");
        this.isProcessing.set(false);
      }
    });
  }

  updateUserProfil(data: UpdateUserProfileRequestInterface) {
    this.isProcessing.set(true);
    setTimeout(() => this.update(data), 1000);
  }

}
