import { Component, DestroyRef, effect, inject, signal, type OnDestroy } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MyGallery } from '../../components/my-gallery/my-gallery';
import { PostService } from '../../services/post.service';
import { type Subscription } from 'rxjs';
import { toast } from 'ngx-sonner';
import { HlmAlertImports } from '@spartan-ng/helm/alert';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCircleCheck } from '@ng-icons/lucide';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import type { CreatePostRequestInterface } from '../../interfaces/post.interface';


@Component({
  selector: 'post',
  imports: [MyGallery, ReactiveFormsModule, HlmAlertImports, NgIcon, HlmIconImports],
  providers: [provideIcons({ lucideCircleCheck })],
  templateUrl: './post.html',
})
export class Post implements OnDestroy {

  private postService = inject(PostService);
  private captionSub?: Subscription;
  charsCounter = signal<number>(0);

  displayError = signal<boolean>(false);

  selectedMedias = signal<string[]>([]);

  public errorMsg = "";

  postForm = new FormGroup({
    caption: new FormControl<string>("", [Validators.required, Validators.minLength(1), Validators.maxLength(120)]),
    medias: new FormArray<FormControl<string>>([], [Validators.required])
  });

  catchSelection(ids: string[]) {
    this.selectedMedias.set(ids);
    this.updateFormArray();
  }

  getSelectionSize() {
    return this.selectedMedias().length;
  }

  updateFormArray() {
    const mediasArray = this.postForm.controls.medias;
    mediasArray.clear();

    for (const url of this.selectedMedias()) {
      mediasArray.push(new FormControl<string>(url, { nonNullable: true },));
    }

  }

  sendPost() {
    this.displayError.set(false);
    this.errorMsg = "Error: \n";
    if (this.postForm.valid) {
      const payload: CreatePostRequestInterface = {
        caption: this.postForm.controls.caption.value as string,
        medias: this.postForm.controls.medias.value
      };
      this.postService.createPost(payload).subscribe({
        next: () => {
          toast.success("Post created successfully");
          this.postForm.reset();
          this.selectedMedias.set([]);
        }
      });
    } else {
      if (this.postForm?.controls?.caption?.errors?.["required"]) {
        this.errorMsg += "- Caption must not be null.\n";
      }
      if (this.postForm?.controls.caption?.errors?.["maxlength"]) {
        this.errorMsg += "- Caption length must be between 1 and 120 characters.\n";
      }
      if (this.postForm?.controls.medias?.errors?.["required"]) {
        this.errorMsg += "- At least 1 medias must be attached to the post.";
      }
      this.displayError.set(true);
    }
  }

  constructor() {
    const captionCtrl = this.postForm.controls.caption;

    this.captionSub = captionCtrl.valueChanges.subscribe({
      next: (value) => {
        this.charsCounter.set((value ?? '').length);
      }
    });
  }
  ngOnDestroy(): void {
    this.captionSub?.unsubscribe();
  }

}
