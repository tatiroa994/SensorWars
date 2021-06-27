import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchDataService {
  urlPrueba = 'https://5c1e669cbba9.ngrok.io/';
  url = 'http://18.117.255.122:3000/';
  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get(`${this.urlPrueba}info`);
  }

  runGame(value:number): Observable<any> {
    return this.http.get(`${this.url}connect/${value}`);
  }
}
