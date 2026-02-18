import { Component, DestroyRef, effect, inject, signal, type OnDestroy } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MyGallery } from '../../components/my-gallery/my-gallery';
import { PostService } from '../../services/post.service';
import { startWith, takeUntil, type Subscription } from 'rxjs';
import type { CreatePostRequestInterface } from '../../interfaces/post.interface';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'post',
  imports: [MyGallery, ReactiveFormsModule],
  templateUrl: './post.html',
})
export class Post implements OnDestroy {

  private postService = inject(PostService);
  private captionSub?: Subscription;
  charsCounter = signal<number>(0);

  selectedMedias = signal<string[]>([]);

  postForm = new FormGroup({
    caption: new FormControl<string>("", [Validators.required, Validators.minLength(1), Validators.maxLength(120)]),
    medias: new FormArray<FormControl<string>>([])
  });

  catchSelection(urls: string[]) {
    this.selectedMedias.set(urls);
  }

  getSelectionSize() {
    return this.selectedMedias().length;
  }

  updateFormArray() {
    const mediasArray = this.postForm.controls.medias;
    mediasArray.clear();

    for (const url of this.selectedMedias()) {
      mediasArray.push(new FormControl<string>(url, { nonNullable: true }));
    }
  }

  sendPost() {
    this.updateFormArray();
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
