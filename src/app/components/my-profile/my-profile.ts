import { Component, effect, input, output, signal } from '@angular/core';
import { UserProfileInterface, type UpdateUserProfileRequestInterface } from '../../interfaces/user-profile.interface';
import { HlmTextareaImports } from '@spartan-ng/helm/textarea';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { provideIcons } from '@ng-icons/core';
import { lucideLock, lucideLockOpen } from '@ng-icons/lucide';
import { MyGallery } from '../my-gallery/my-gallery';
import { toast } from 'ngx-sonner';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'my-profile',
  imports: [HlmTextareaImports, HlmLabelImports, HlmInputImports, HlmButtonImports, HlmIconImports, ReactiveFormsModule, MyGallery],
  providers: [provideIcons({ lucideLock, lucideLockOpen })],
  templateUrl: './my-profile.html'
})
export class MyProfile {
  userProfile = input<UserProfileInterface | null>(null);

  mode = signal<"READ" | "UPDATE">("READ");

  updateFormOutput = output<UpdateUserProfileRequestInterface>();

  updatingPicture = signal<boolean>(false);

  labelForPictureField = signal<"profilePicture" | "coverPicture">("profilePicture");


  updateForm = new FormGroup({
    description: new FormControl<string>(''),
    profilePicture: new FormControl<string | null>(null),
    coverPicture: new FormControl<string | null>(null),
  });

  constructor() {
    effect(() => {
      const profile = this.userProfile();
      if (!profile) return;

      this.updateForm.patchValue({
        description: profile.description ?? '',
        profilePicture: profile.picture,
        coverPicture: profile.coverPicture,
      }, { emitEvent: false });
    });
  }

  getBaseUrl(type: "profile" | "cover") {
    return environment.mediaUrl + (type === "profile" ? this.userProfile()?.picture : this.userProfile()?.coverPicture);
  }

  switchMode(mode: "READ" | "UPDATE") {
    this.mode.set(mode);
  }

  openGallery(label: "profilePicture" | "coverPicture") {
    this.labelForPictureField.set(label);
    this.updatingPicture.set(true);
  }

  catchUrl(url: string) {
    this.updatingPicture.set(false);
    let message = "Image chosen for ";
    if (this.labelForPictureField() === "profilePicture") {
      this.updateForm.controls.profilePicture.setValue(url);
      message += "profile picture";
    }
    if (this.labelForPictureField() === "coverPicture") {
      this.updateForm.controls.coverPicture.setValue(url);
      message += "cover picture";
    }
    this.update();
    toast.success(message);
  }

  update() {
    const form = this.updateForm.value;
    this.updateFormOutput.emit({
      payload:
      {
        description: form.description as string | null,
        picture: form.profilePicture as string | null,
        coverPicture: form.coverPicture as string | null
      }
    });
  }



}
