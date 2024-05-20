import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import jsQR from 'jsqr';

@Component({
  selector: 'app-scanner-qr',
  templateUrl: './scanner-qr.component.html',
  styleUrls: ['./scanner-qr.component.scss'],
})
export class ScannerQRComponent implements AfterViewInit {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;
  qrCodeData: string | null = null;

  constructor() {}

  ngAfterViewInit() {
    this.startVideo();
  }

  async startVideo() {
    try {
      const constraints = {
        video: {
          facingMode: 'environment',
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const video = this.videoElement.nativeElement;

      if (video) {
        video.srcObject = stream;
        video.setAttribute('playsinline', ''); // Necessary for iOS

        await new Promise<void>((resolve, reject) => {
          video.onloadedmetadata = () => {
            resolve(video.play());
          };
          video.onerror = (error) => {
            reject(error);
          };
        });

        this.scanQRCode();
      }
    } catch (error) {
      console.error('Error accessing the camera: ', error);
      alert('Error accessing the camera: ' + error);
    }
  }

  scanQRCode() {
    const canvas = this.canvasElement.nativeElement;
    const context = canvas.getContext('2d');
    const video = this.videoElement.nativeElement;

    const tick = () => {
      if (video.readyState === video.HAVE_ENOUGH_DATA && context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          this.qrCodeData = code.data;
          const tracks = (video.srcObject as MediaStream).getTracks();
          tracks.forEach(track => track.stop());
        }
      }

      if (!this.qrCodeData) {
        requestAnimationFrame(tick);
      }
    };

    tick();
  }
}
