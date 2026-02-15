import {
    Component,
    ElementRef,
    ViewChild,
    signal,
    afterNextRender,
    OnDestroy,
    inject,
    Injector,
    runInInjectionContext,
    output,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCamera, lucideX } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { HlmPopoverImports } from '@spartan-ng/helm/popover';

@Component({
    selector: 'app-camera',
    standalone: true,
    templateUrl: './camera.html',
    imports: [HlmButtonImports, NgIcon, HlmIconImports, HlmPopoverImports],
    providers: [provideIcons({ lucideCamera, lucideX })],
})
export class Camera implements OnDestroy {
    @ViewChild('video') videoRef?: ElementRef<HTMLVideoElement>;

    private injector = inject(Injector);
    private stream?: MediaStream;

    shot = signal<string | null>(null);
    captured = output<File>();

    openCamera() {
        runInInjectionContext(this.injector, () => {
            afterNextRender(() => {
                if (!this.stream) void this.start();
            });
        });
    }

    private async start() {
        if (!navigator.mediaDevices?.getUserMedia) return;

        this.stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                width: { ideal: 1280 },
                height: { ideal: 720 },
                facingMode: 'user',
            },
        });

        const video = this.videoRef?.nativeElement;
        if (!video) return;

        video.srcObject = this.stream;
        await video.play();
    }

    capturePreview() {
        const video = this.videoRef?.nativeElement;
        if (!video) return;

        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(video, 0, 0);
        this.shot.set(canvas.toDataURL('image/jpeg', 0.85));
    }

    async uploadCapture(ctx: any) {
        const file = await this.captureToFile();
        if (!file) return;

        this.captured.emit(file);
        this.closePopover(ctx);
    }

    clearShot() {
        this.shot.set(null);
    }

    stop() {
        this.stream?.getTracks().forEach((t) => t.stop());
        this.stream = undefined;

        const video = this.videoRef?.nativeElement;
        if (video) video.srcObject = null;
    }

    closePopover(ctx: any) {
        this.stop();
        this.shot.set(null);
        ctx.close();
    }

    private async captureToFile(): Promise<File | null> {
        const video = this.videoRef?.nativeElement;
        if (!video) return null;

        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext('2d');
        if (!ctx) return null;

        ctx.drawImage(video, 0, 0);

        const blob = await new Promise<Blob | null>((res) =>
            canvas.toBlob(res, 'image/jpeg', 0.92)
        );
        if (!blob) return null;

        return new File([blob], 'capture.jpg', { type: blob.type });
    }

    ngOnDestroy() {
        this.stop();
    }
}
