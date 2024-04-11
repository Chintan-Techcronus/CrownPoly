import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class HttpinterceptorInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (this.authService.isAuthenticatedUser()) {
            const auth: any = localStorage.getItem('auth') ? localStorage.getItem('auth') : { token: "" };
            const authObj = JSON.parse(auth);
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + authObj.token) });
        }
        return next.handle(request);
    }
}