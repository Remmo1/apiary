import { Injectable, Signal, signal } from '@angular/core';
import * as handpose from '@tensorflow-models/handpose';

import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-cpu';
import { drawKeypoints } from './hand-renderer';
import { GE } from './fingere-gesture';
import { BehaviorSubject } from 'rxjs';
import { log } from '@tensorflow/tfjs-core/dist/log';

const GestureMap = {
  thumbs_up: 'ok',
  thumbs_down: 'cancel',
};

type Gesture = 'thumbs_down' | 'thumbs_up' | 'none';
type Direction = 'left' | 'right' | 'none';
type Size = [number, number];
type Point = [number, number];
type Rect = { topLeft: [number, number]; bottomRight: [number, number] };

@Injectable({
  providedIn: 'root',
})
export class HandGesture {
  private _swipe$ = new BehaviorSubject<Direction>('none');
  readonly swipe$ = this._swipe$.asObservable();

  private _gesture$ = signal<Gesture>('none'); // Changed to Signal
  readonly gesture$ = this._gesture$; // Expose as readonly Signal

  private _initiated = false;
  private _initialTimestamp = -1;
  private _stream!: MediaStream;
  private _dimensions!: Size;
  private _lastGestureTiemstamp = -1;
  private _lastGesture: string | null = null;
  private _emitGesture = true;

  get stream(): MediaStream {
    return this._stream;
  }

  initialize(canvas: HTMLCanvasElement, video: HTMLVideoElement): void {
    this._dimensions = [video.width, video.height];
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        this._stream = stream;
        return handpose.load();
      })
      .then((model) => {
        const context = canvas.getContext('2d');
        if (!context) {
          console.log('context is null');
          return;
        }
        context.clearRect(0, 0, video.width, video.height);
        context.strokeStyle = 'red';
        context.fillStyle = 'red';

        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        const runDetection = () => {
          model.estimateHands(video).then((predictions) => {
            // Render
            context.drawImage(
              video,
              0,
              0,
              video.width,
              video.height,
              0,
              0,
              canvas.width,
              canvas.height
            );
            if (predictions && predictions[0]) {
              drawKeypoints(context, predictions[0].landmarks);
              this._process(predictions[0].boundingBox);
              this._processGesture(predictions[0].landmarks);
            }
            requestAnimationFrame(runDetection);
          });
        };
        runDetection();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  private _processGesture(landmarks: any): void {
    const { gestures } = GE.estimate(landmarks, 5) || [];
    let detectedGesture = null;

    for (const g of gestures) {
      if (g.name === 'thumbs_up') {
        detectedGesture = g.name;
        break;
      }
      if (g.name === 'thumbs_down') {
        detectedGesture = g.name;
        break;
      }
      if (g.name === 'one_finger') {
        detectedGesture = g.name;
        break;
      }
      if (g.name === 'victory') {
        detectedGesture = g.name;
        break;
      }
    }

    if (!detectedGesture && gestures.length) {
      console.log('Gesture detected:', detectedGesture);
    }

    if (this._lastGesture !== detectedGesture) {
      this._lastGesture = detectedGesture;
      this._lastGestureTiemstamp = Date.now();
      console.log('Gesture detected:', detectedGesture);

      this._gesture$.set(detectedGesture as keyof typeof GestureMap as Gesture); // Update the Signal
      this._emitGesture = true;
    } else {
      if (
        this._emitGesture &&
        this._toSeconds(Date.now() - this._lastGestureTiemstamp) > 1
      ) {
        if (this._lastGesture) {
          const gesture = GestureMap[this._lastGesture as keyof typeof GestureMap];
          if (gesture) {
            log(' gesture updated');
            this._gesture$.set(gesture as keyof typeof GestureMap as Gesture); // Update the Signal
          }
        }
        this._emitGesture = false;
      }
    }
  }

  private _process(rect: Rect): void {
    const middle = this._getMiddle(rect);
    if (this._aroundCenter(middle)) {
      this._initialTimestamp = Date.now();
      this._initiated = true;
      return;
    }
    if (!this._initiated) {
      return;
    }
    if (
      this._inRegion(0, 0.1, middle) &&
      this._toSeconds(Date.now() - this._initialTimestamp) < 2
    ) {
      this._swipe$.next('right');
      this._initiated = false;
      return;
    }
    if (
      this._inRegion(0.9, 1, middle) &&
      this._toSeconds(Date.now() - this._initialTimestamp) < 2
    ) {
      this._swipe$.next('left');
      this._initiated = false;
      return;
    }
  }

  private _toSeconds(ms: number): number {
    return ms / 1000;
  }

  private _aroundCenter(center: Point): boolean {
    return this._inRegion(0.4, 0.6, center);
  }

  private _inRegion(start: number, end: number, point: Point): boolean {
    return (
      this._dimensions[0] * start < point[0] &&
      this._dimensions[0] * end > point[0]
    );
  }

  private _getMiddle(rect: Rect): Point {
    return [
      rect.topLeft[0] + (rect.bottomRight[0] - rect.topLeft[0]) / 2,
      rect.topLeft[1] + (rect.bottomRight[1] - rect.topLeft[1]) / 2,
    ];
  }
}