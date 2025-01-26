import { Injectable } from '@angular/core';
import { GucioService } from './gucio.service';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {

  constructor() { }

  speak(text: string): void {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  }

  stop(): void {
    speechSynthesis.cancel();
  }
}