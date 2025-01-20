import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeechRecognitionService {

  recognition: any;
  isListening: boolean = false;
  isManuallyStopped: boolean = false;
  //finalTranscript: string = '';
  //public onEndSignal = signal<boolean>(false);
  
  constructor() {
    const SpeechRecognition = (window as any).webkitSpeechRecognition;

    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'pl-PL';
    //this.recognition.interimResults = true;
    this.recognition.continuous = true

    this.recognition.onend = () => {
      if (!this.isManuallyStopped) {
        console.log('Speech recognition stopped by the browser, restarting...');
        this.restartRecognition();
      }
    };
  }

  startRecognition(): void {
    this.recognition.start();
    this.isListening = true;
    this.isManuallyStopped = false;
  }

  stopRecognition(isManuallyStopped: boolean = false): void {
    this.isManuallyStopped = isManuallyStopped;
    this.recognition.stop();
    this.isListening = false;

  }

  restartRecognition(): void {
    this.recognition.start();
    this.isManuallyStopped = false;
  }

  onResult(callback: (text: string) => void): void {
    this.recognition.onresult = (event: any) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        transcript += event.results[i][0].transcript;
      }
      callback(transcript);
    };
    // this.recognition.onresult = (event: any) => {
    //   const transcript = event.results[0][0].transcript;
    //   callback(transcript);
    // };
    // this.recognition.onresult = (event: any) => {
    //   let finalTranscript = '';
    //   for (let i = event.resultIndex; i < event.results.length; ++i) {
    //     if (event.results[i].isFinal) {
    //       finalTranscript += event.results[i][0].transcript;
    //     }
    //   }
    //   console.log(finalTranscript);
      
    //   callback(finalTranscript);
    // };
  }

  onError(callback: (event: any) => void): void {
    this.recognition.onerror = callback;
  }
}