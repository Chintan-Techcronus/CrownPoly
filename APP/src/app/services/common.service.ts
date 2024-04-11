import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers :  new HttpHeaders({ 'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  httpDefaults: Parameters = {
    url: '',
    parameterObject: {}
  };

  constructor(private http: HttpClient) { }

  public post(url: string, parameterObject?: any): Observable<any> {
    return this.http.post(url, parameterObject, httpOptions);
  }

  public postWithoutModel(url: string): Observable<any> {
    return this.http.post(url, httpOptions);
  }

  public get(url: string): Observable<any> {
    return this.http.get(url, httpOptions);
  }
}
export interface Parameters {
  url: string;
  parameterObject?: any;
}
