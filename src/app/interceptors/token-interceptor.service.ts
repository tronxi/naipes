import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenService} from '../services/token.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private tokenService: TokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = this.tokenService.get();

    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          Authorization: token,
        }
      });
    }
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.headers.get('authorization') !== null) {
            this.tokenService.save(event.headers.get('authorization'));
          }
          return event;
        }
      })
    );
  }
}
