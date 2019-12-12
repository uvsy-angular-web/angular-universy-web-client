import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from '../services/auth/auth.service';
import {NavigationService} from '../services/system/navigation.service';

const AUTH_ERROR_CODE = 401;

@Injectable()
export class AuthErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService,
              private navigationService: NavigationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === AUTH_ERROR_CODE) {
          AuthService.logout();
          this.navigationService.navigateToHomePage();
        }
        const error = err.error.message || err.statusText;
        return throwError(error);
      }));
  }
}
