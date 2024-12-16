import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root'
})
export class WorksService {
  private apiUrl = window.location.protocol + '//' + window.location.hostname + ':8080/api/works';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  
    // Create a new work
    createWork(work: Note): Observable<Note> {
      return this.http.post<Note>(this.apiUrl, work, this.httpOptions)
        .pipe(
          catchError(this.handleError<Note>('createWork'))
        );
    }
  
    // Get all works
    getWorks(): Observable<Note[]> {
      return this.http.get<Note[]>(this.apiUrl)
        .pipe(
          catchError(this.handleError<Note[]>('getWorks', []))
        );
    }

   // Get a work by ID
   getWork(id: number): Observable<Note> {
     const url = `${this.apiUrl}/${id}`;
     return this.http.get<Note>(url)
       .pipe(
         catchError(this.handleError<Note>(`getWork id=${id}`))
       );
   }

    // // Get works for hive
    // getWorksForHive(hiveId: number): Observable<Work[]> {
    //   return this.http.get<Work[]>(this.apiUrl)
    //     .pipe(
    //       catchError(this.handleError<Work[]>('getWorks', []))
    //     );
    // }
  
    // Delete a work
    deleteWork(id: number): Observable<Note> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.delete<Note>(url, this.httpOptions)
        .pipe(
          catchError(this.handleError<Note>('deleteWork'))
        );
    }

      // Delete a work
      updateWork(work: Note): Observable<Note> {
        const url = `${this.apiUrl}/${work.id}`;
        return this.http.put<Note>(url, work, this.httpOptions)
          .pipe(
            catchError(this.handleError<Note>('deleteWork'))
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
