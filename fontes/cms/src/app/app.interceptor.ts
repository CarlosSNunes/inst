import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { retry } from "rxjs/operators";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        "Content-Type": "application/json"
      }
    });
    return next.handle(request).pipe(retry(2))
  }
}
