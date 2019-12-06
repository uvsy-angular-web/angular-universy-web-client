import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth/auth.service';
import {SystemConfigService} from '../services/system/system-config.service';

const BEARER = 'Bearer';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = AuthService.getCurrentUser();
    const isLoggedIn = currentUser && currentUser.token;
    const baseUrl = TokenInterceptor.getBaseUrl();
    const isApiUrl = request.url.startsWith(baseUrl);

    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `${BEARER} ${currentUser.token}`
        }
      });
    }
    return next.handle(request);
  }

  static getBaseUrl() {
    return SystemConfigService.getBaseUrl();
  }
}

