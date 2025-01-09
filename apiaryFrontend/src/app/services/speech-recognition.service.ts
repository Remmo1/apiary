import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeechRecognitionService {

  recognition: any;
  isListening: boolean = false;

  constructor() {
    const SpeechRecognition = (window as any).webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'pl-PL';
    this.recognition.interimResults = true;
    this.recognition.continuous = true
  }

  startRecognition(): void {
    this.recognition.start();
    this.isListening = true;
  }

  stopRecognition(): void {
    this.recognition.stop();
    this.isListening = false;
  }

  onResult(callback: (text: string) => void): void {
    this.recognition.onresult = (event: any) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        transcript += event.results[i][0].transcript;
      }
      callback(transcript);
    };
  }

  onError(callback: (event: any) => void): void {
    this.recognition.onerror = callback;
  }
}