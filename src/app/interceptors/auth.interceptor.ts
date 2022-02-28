import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor( private auth: AuthService ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    /* agrega el jwt al header */
    const idToken = localStorage.getItem('id_token');

    if ( !idToken ) {
      return next.handle(request);
    }

    const cloned = request.clone({
      headers: request.headers.set('Authorization', idToken)
    })

    /* maneja el error 401 */
    return next.handle(cloned).pipe(
      catchError( (response: HttpErrorResponse) => {
        if ( response.status === 401 ) {
          this.auth.logout();
        }
        return throwError(() => response);
      })
    )

  }
}
