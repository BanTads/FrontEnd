import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutoCadastroService {
  private readonly API_URL = 'http://localhost:3000/autocadastro';

  constructor(private http: HttpClient) {}

  autocadastrar(requestBody: any): Observable<any> {
    return this.http.post(this.API_URL, requestBody);
  }
}
