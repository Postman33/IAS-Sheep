import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable()
export class GeneralInterceptorService implements HttpInterceptor{
  constructor(private authService : AuthService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.Token) {
    req = req.clone({
      setHeaders: {
        Authorization: this.authService.Token
      }
    })
  }
    return next.handle(req);
  }

}
