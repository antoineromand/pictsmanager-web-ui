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

@Component({
  selector: 'my-profile',
  imports: [HlmTextareaImports, HlmLabelImports, HlmInputImports, HlmButtonImports, HlmIconImports, ReactiveFormsModule],
  providers: [provideIcons({ lucideLock, lucideLockOpen })],
  templateUrl: './my-profile.html'
})
export class MyProfile {
  userProfile = input<UserProfileInterface | null>(null);

  mode = signal<"READ" | "UPDATE">("READ");

  updateFormOutput = output<UpdateUserProfileRequestInterface>();

  updateForm = new FormGroup({
    description: new FormControl<string>(''),
    profilePicture: new FormControl<File | null>(null),
    coverPicture: new FormControl<File | null>(null),
    profilePictureUrl: new FormControl<string>(''),
    coverPictureUrl: new FormControl<string>('')
  });

  constructor() {
    effect(() => {
      const profile = this.userProfile();
      if (!profile) return;

      this.updateForm.patchValue({
        description: profile.description ?? '',
        profilePictureUrl: profile.picture ?? '',
        coverPictureUrl: profile.coverPicture ?? '',
        profilePicture: null,
        coverPicture: null,
      }, { emitEvent: false });
    });
  }

  switchMode(mode: "READ" | "UPDATE") {
    this.mode.set(mode);
  }

  update() {
    const form = this.updateForm.value;
    this.updateFormOutput.emit({ payload: { description: form.description, picture: form.profilePictureUrl, coverPicture: form.coverPictureUrl } });
  }



}
