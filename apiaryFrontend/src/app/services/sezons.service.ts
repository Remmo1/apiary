import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sezon } from '../models/sezon';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SezonsService {

  private apiUrl = process.env['SEASON_URL'] || '';  

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { 
    console.log(this.apiUrl);
  }

  // Create a new sezon
  createSezon(sezon: Sezon): Observable<Sezon> {
    return this.http.post<Sezon>(this.apiUrl, sezon, this.httpOptions)
      .pipe(
        catchError(this.handleError<Sezon>('createSezon'))
      );
  }

  // Get all sezons
  getSezons(): Observable<Sezon[]> {
    return this.http.get<Sezon[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError<Sezon[]>('getSezons', []))
      );
  }

  // Delete a sezon
  deleteSezon(id: number): Observable<Sezon> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Sezon>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<Sezon>('deleteSezon'))
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
