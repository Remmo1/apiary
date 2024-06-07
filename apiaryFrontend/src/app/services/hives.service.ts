import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Hive } from '../models/hive';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HivesService {
  private apiUrl = window.location.protocol + '//' + window.location.hostname + ':8080/api/hives';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // Create a new hive
  createHive(hive: Hive): Observable<Hive> {
    return this.http.post<Hive>(this.apiUrl, hive, this.httpOptions)
      .pipe(
        catchError(this.handleError<Hive>('createHive'))
      );
  }

  // Get all hives
  getHives(): Observable<Hive[]> {
    return this.http.get<Hive[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError<Hive[]>('getHives', []))
      );
  }

  // Get a hive by ID
  getHive(id: number): Observable<Hive> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Hive>(url)
      .pipe(
        catchError(this.handleError<Hive>(`getHive id=${id}`))
      );
  }

  // Update a hive
  updateHive(id: number, hive: Hive): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    console.log(hive);

    const tempCorps: { framesBlack: number; framesBrown: number; framesWhite: number; framesEmpty: number; }[] = [];
    hive.corps.forEach(corp => {tempCorps.push({framesBlack: corp.framesBlack, framesBrown: corp.framesBrown, framesWhite: corp.framesWhite, framesEmpty: corp.framesEmpty})});
    
    const tempNotes: { date: Date; text: string; honey: number; syrup: number; }[] = [];
    hive.notes.forEach(note => {tempNotes.push({date: note.date, text: note.text, honey: note.honey, syrup: note.syroup})});

    const data = {
      id: hive.id,
      name: hive.name,
      queen: hive.queen,
      corps: tempCorps,
      notes: tempNotes
    };

    console.log(data);
    
    
    return this.http.put(url, data, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('updateHive'))
      );
  }

  // Delete a hive
  deleteHive(id: number): Observable<Hive> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Hive>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<Hive>('deleteHive'))
      );
  }

  // Handle HTTP operation that failed.
  // Let the app continue.
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // Log the error to the console
      return of(result as T); // Let the app keep running by returning an empty result.
    };
  }
}
