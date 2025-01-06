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
    this.recognition.interimResults = false;
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
      const transcript = event.results[0][0].transcript;
      callback(transcript);
    };
  }

  onError(callback: (event: any) => void): void {
    this.recognition.onerror = callback;
  }
}