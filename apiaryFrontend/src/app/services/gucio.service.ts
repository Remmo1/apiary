import { Injectable, NgZone, OnInit, signal } from '@angular/core';
import { SpeechService } from './speech.service';
import { SpeechRecognitionService } from './speech-recognition.service';
import { Router } from '@angular/router';
import { HivesService } from './hives.service';
import { log } from '@tensorflow/tfjs-core/dist/log';

@Injectable({
  providedIn: 'root'
})
export class GucioService{
  userText: string = 'pszczoła';
  isListening: boolean = false;
  recognition: any;
  isManuallyStopped: boolean = false;

  hivesWithNames: Map<number, string> = new Map<number, string>();
  commandSignal = signal<string>(""); 
  
  constructor(private speechService: SpeechService, private router: Router, private ngZone: NgZone, private hivesService: HivesService) {    
    
    const SpeechRecognition = (window as any).webkitSpeechRecognition;

    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'pl-PL';
    this.recognition.interimResults = true;
    this.recognition.continuous = true

    this.recognition.onend = () => {
      if (!this.isManuallyStopped) {
        console.log('Speech recognition stopped by the browser, restarting...');
        this.restartRecognition();
      }
    };

    this.onResult((text: string) => {
        this.userText = text;
        this.interpretText();
        this.isListening = false;

    });
  }

  interpretText() : void {
      var text = this.userText.toLowerCase().trim();
      this.ngZone.run(() => {
        const currentUrl = this.router.url;

        if (text.includes('idź') || text.includes('przejdź') || text.includes('otwórz')) {
          if (text.includes('główną') || text.includes('startową') || text.includes('głównej') || text.includes('startowej')) {
            this.speak("Przechodzę na stronę główną");
            this.router.navigate(['/home']);
          } else if (text.includes('ule') || text.includes('pasiekę') || text.includes('pasieki') || text.includes('uli')) {
            this.speak("Przechodzę na stronę uli");
            this.router.navigate(['/hives']);
          } else if (text.includes('sezony') || text.includes('sezon')) {
            this.speak("Przechodzę na stronę sezonów");
            this.router.navigate(['/sezons']);
          }
        }
        else if (text.includes('pokaż')) {
            if (text.includes('ul')) {
              console.log(text);
              
              this.hivesWithNames.forEach((name, id) => {
                if (text.includes(name)) {
                  this.speak("Pokazuję ul " + name);
                  this.router.navigate(['/hive', id]);
                }
              });
            }
          }
        else if(text.includes('koniec') || text.includes('kończymy') ){
          this.end();
          this.commandSignal.set('end');
          this.stopRecognition(true);
        }
        else{
          switch (currentUrl) 
          {

          //Main page
          case '/home':
            if(text.includes('pomoc') || text.includes('pomóż') || text.includes('pomocy')){
              this.help();
            }
            else
            {
              console.log('Command not recognized:', text);
            }
            break;
          //Hives page
          case '/hives':
            if(text.includes('wróć') || text.includes('powrót') || text.includes('cofnij') || text.includes('powróć')) 
            {
              this.speak("Wracam do strony głównej");
              this.router.navigate(['/home']);
            }
            else if(text.includes('pomoc') || text.includes('pomóż') || text.includes('pomocy')){
              this.help();
            }
            else
            {
              console.log('Command not recognized:', text);
            }
            break;

          //Sezons page
          case '/sezons':
              if(text.includes('wróć') || text.includes('powrót') || text.includes('cofnij') || text.includes('powróć')) 
              {
                this.speak("Wracam do strony głównej");
                this.router.navigate(['/home']);
              }
              else if(text.includes('pomoc') || text.includes('pomóż') || text.includes('pomocy')){
                this.help();
              }
              else
              {
                console.log('Command not recognized:', text);
              }
              break;

          //Choosen hive page
          default:
            if(text.includes('wróć') || text.includes('powrót') || text.includes('cofnij') || text.includes('powróć')) 
            {
              this.speak("Wracam do strony uli");
              this.router.navigate(['/hives']);
            }
            else if(text.includes('pomoc') || text.includes('pomóż') || text.includes('pomocy') ){
              this.help();
            }
            else if(text.includes('dodaj'))
            {
              if(text.includes('notatkę'))
              {
                this.speak("Dodaję notatkę");
                if(currentUrl.includes('hive'))
                {            
                  this.stopRecognition(true);
                  this.commandSignal.set('add note');
                }
              }
            }
            else if(text.includes('zapisz'))
            {
              this.speak("Zapisuję zmiany");
              this.commandSignal.set('save');
            }
            else
            {
              console.log('Command not recognized:', text);
            }
          }
        }

      });

      this.commandSignal.set('');
  } 

  greeting(): void {
    this.speechService.speak(`Cześć, nazywam się Gucio i z chęcią pomogę Ci w pracy na pasiece. 
      Jestem trochę zaspany bo dopiero wstałem. Przez to mogę reagować trochę wolniej za co z góry przepraszam. 
      Jeśli chcesz żebym Ci pomógł, pomachaj do kamery.`);
  }

  help(): void {
    this.speak(`Jeśli chcesz przejść do wybranej strony powiedz, "przejdź do" i nazwę strony. 
      Jeśli chcesz zobaczyć informacje o wybranym ulu powiedz, "pokaż" i nazwę ula.
      Jeśli chcesz wrócić do poprzedniej strony powiedz, "wróć".
      Jeśli chcesz dodać notatkę powiedz, "dodaj notatkę".
      Aby zapisać notatkę pokaż kciuk w górę. Aby anulować pokaż kciuk w dół.
      Jeśli chcesz zapisać zmiany w ulu powiedz, "zapisz".
      Jeśli chcesz zakończyć rozmowę powiedz, "koniec".
      Mam nadzieję, że Ci pomogłem.`
    );
  }

  start(): void {
    this.speak('Cześć, już słucham. Co mogę dla Ciebie zrobić? ');
  } 

  end(): void {
    this.speak('Mam nadzieję, że Ci pomogłem. Do zobaczenia, a ja wracam do spania!');
  }

  speak(text: string): void {
    this.speechService.speak(text);
  }

  startRecognition(): void {
    this.recognition.start();
    this.isListening = true;
    this.isManuallyStopped = false;
    
    this.hivesService.getHives().subscribe(hives => {
      hives.forEach( hive => {
        console.log(hive);
        
        this.hivesWithNames.set(hive.id, hive.name.toLowerCase());
      });
    });
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
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      callback(finalTranscript);
    };
  }

  onError(callback: (event: any) => void): void {
    this.recognition.onerror = callback;
  }
}
