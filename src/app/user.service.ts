/** Angular Imports */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

/** rxjs Imports */
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

/**
 * Users service.
 */
@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }
  /**
   * @param {any} user User to be created.
   * @returns {Observable<any>}
   */
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  createUser(user: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/v1/user', user, this.httpOptions)
    .pipe(
      catchError(this.handleError)
      );
  }
  login(username: string, password: string): Observable<any> {
    return this.http.post('http://localhost:8080/api/v1/login', { username, password }, this.httpOptions)
    .pipe(
      catchError(this.handleError)
      );
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
