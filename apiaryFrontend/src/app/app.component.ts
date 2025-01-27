import { AfterViewInit, Component, effect, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { SpeechService } from './services/speech.service';
import { SpeechRecognitionService } from './services/speech-recognition.service';
import { GucioService } from './services/gucio.service';

import { Router, RouterOutlet } from '@angular/router';
import * as handpose from '@tensorflow-models/handpose';
import { log } from '@tensorflow/tfjs-core/dist/log';
import { HandGesture } from './services/hand-gesture.service';
import { filter, map, withLatestFrom } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [CommonModule, RouterOutlet]
})
export class AppComponent implements AfterViewInit {
  title = 'BeeKing';
  text: string = 'pszczoła';
  isListening: boolean = false;
  model: any;
  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('indicator') listeningIndicator!: ElementRef;

  started$ = this._recognizer.swipe$.pipe(
    filter((value) => value === 'left' || value === 'right'),
    map((value) => (value === 'left' ? 'left' : 'right'))
  );

  commandSignal = this.gucioService.commandSignal;

  gesture$ = this._recognizer.gesture$();
  // $(
  //   filter((value) => value === 'ok'),
  //   map((value) => (value === 'ok' ? 'start' : 'nothing'))
  // );

  constructor(private speechService: SpeechService, private speechRecognitionService: SpeechRecognitionService, private gucioService: GucioService,
    private _recognizer: HandGesture, private _router: Router
  ) { 
    this.started$.subscribe((value) => {
      if ((value === 'left' || value === 'right')&& !this.isListening) {
        this.startListening();
      }
    });
    this.gesture$ = this._recognizer.gesture$();
    // .pipe(
    //   filter((value) => value === 'ok'),
    //   withLatestFrom(this.gesture$)
    // )
    effect(() => {
      switch (this.commandSignal()) {
        case 'end':
          this.listeningIndicator.nativeElement.classList.remove('listening_indicator_active');
          this.listeningIndicator.nativeElement.classList.add('listening_indicator_incactive');
          this.isListening = false;
          break;
        default:
          break;
      }
    }
    );
  }
 
  startListening(): void {
    this.gucioService.startRecognition();
    this.gucioService.start()
    this.isListening = true;
    this.listeningIndicator.nativeElement.classList.remove('listening_indicator_incactive');
    this.listeningIndicator.nativeElement.classList.add('listening_indicator_active');
  }

  stopListening(): void {
    this.gucioService.stopRecognition(true);
    this.isListening = false;
    this.listeningIndicator.nativeElement.classList.remove('listening_indicator_active');
    this.listeningIndicator.nativeElement.classList.add('listening_indicator_incactive');
  }

  get stream(): MediaStream {
    return this._recognizer.stream;
  }

  ngAfterViewInit(): void {
    //this.gucioService.greeting();
    this._recognizer.initialize(
      this.canvas.nativeElement,
      this.video.nativeElement
    );
  }
  
  // async ngOnInit() {

    // console.log('Handpose model started.');
    // this.model = await handpose.load();
    // console.log('Handpose model loaded.');
    // const video = await this.setupCamera();
    // this.detectHands(video);
  // }

  // async setupCamera() {
  //   const video = document.createElement('video');
  //   video.width = 640;
  //   video.height = 480;
  
  //   const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  //   video.srcObject = stream;
  
  //   return new Promise<HTMLVideoElement>((resolve) => {
  //     video.onloadedmetadata = () => {
  //       video.play();
  //       resolve(video);
  //     };
  //   });
  // }

  // async detectHands(video: HTMLVideoElement) {
  //   const predictions = await this.model.estimateHands(video);
  //   if (predictions.length > 0) {
  //     console.log('Hand detected:', predictions);
  //     // Process the detected gestures here.
  //   }
  
  //   requestAnimationFrame(() => this.detectHands(video));
  // }
}
