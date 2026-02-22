import { Component, inject, signal, type OnInit } from '@angular/core';
import { forkJoin, EMPTY } from 'rxjs';
import { catchError, finalize, switchMap, tap } from 'rxjs/operators';
import { toast } from 'ngx-sonner';

import { UserProfileService } from '../../services/user-profile.service';
import { PostService } from '../../services/post.service';
import { SocialService } from '../../services/social.service';

import type {
  UpdateUserProfileRequestInterface,
  UserProfileInterface
} from '../../interfaces/user-profile.interface';

import type { PostData } from '../../interfaces/post.interface';

import { MyProfile } from '../../components/my-profile/my-profile';
import { Post } from '../../components/post/post';
import { HlmItemImports } from '@spartan-ng/helm/item';
import { HlmSpinnerImports } from '@spartan-ng/helm/spinner';

@Component({
  selector: 'profile-page',
  imports: [MyProfile, HlmItemImports, HlmSpinnerImports, Post],
  templateUrl: './profile-page.html'
})
export class ProfilePage implements OnInit {
  private userProfileService = inject(UserProfileService);
  private postService = inject(PostService);
  private socialService = inject(SocialService);

  userProfile = signal<UserProfileInterface | null>(null);
  userPosts = signal<PostData[]>([]);
  isProcessing = signal(false);

  ngOnInit(): void {
    forkJoin({
      userProfile: this.userProfileService.getUserProfil(),
      userPosts: this.postService.getUserPost(),
    })
      .pipe(
        tap(({ userProfile, userPosts }) => {
          this.userProfile.set(userProfile.data);
          this.userPosts.set(userPosts.data);
        }),
        catchError(() => {
          toast.error("Impossible de charger le profil.");
          return EMPTY;
        })
      )
      .subscribe();
  }

  updateUserProfile(data: UpdateUserProfileRequestInterface) {
    this.isProcessing.set(true);

    this.userProfileService
      .updateUserProfil(data)
      .pipe(
        tap((response) => {
          this.userProfile.update((current) => {
            if (!current) return current;

            return {
              ...current,
              description: response.data.description ?? current.description,
              picture: response.data.picture ?? current.picture,
              coverPicture: response.data.coverPicture ?? current.coverPicture,
            };
          });

          toast.success('Your profile has been updated.');
        }),
        catchError(() => {
          toast.error("Échec de la mise à jour du profil.");
          return EMPTY;
        }),
        finalize(() => this.isProcessing.set(false))
      )
      .subscribe();
  }

  toggleLikePost(data: { postId: number; state: boolean; }) {
    this.socialService
      .setLikeOnPost(data.postId, data.state)
      .pipe(
        switchMap(() => this.postService.getUserPost()),
        tap((res) => this.userPosts.set(res.data)),
        catchError(() => {
          toast.error("Impossible de mettre à jour le like.");
          return EMPTY;
        })
      )
      .subscribe();
  }
}