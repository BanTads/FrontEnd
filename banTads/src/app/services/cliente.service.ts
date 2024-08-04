import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Cliente } from '../models/cliente.model'; // Adjust the import path as necessary

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getClienteByCpf(): Observable<Cliente> {
    const cookieValue = this.cookieService.get('usuarioLogado');
    const cpf = JSON.parse(cookieValue).cliente.cpf;
    console.log("cpf do service: ",cpf);
    const url = `${this.BASE_URL}/cpf/${cpf}`;

    return this.http.get<any>(url).pipe(
      map(response => {
        const clienteData = response.data;
        return new Cliente(
          clienteData.cpf,
          clienteData.telefone,
          '',
          clienteData.salario,
          clienteData.conta,
          clienteData.endereco,
          clienteData.id,
          clienteData.nome,
          clienteData.email
        );
      })
    );
  }
}
