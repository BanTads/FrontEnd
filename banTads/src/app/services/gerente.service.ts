import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Cliente } from "../models/cliente.model";
import { CookieService } from 'ngx-cookie-service';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GerenteService {
  private BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  loadUsuariosPendentes(): Observable<{ data: Cliente[] }> {
    const cookieValue = this.cookieService.get('usuarioLogado');
    const gerenteId = JSON.parse(cookieValue).gerente.id;
    return this.http.get<{ data: Cliente[] }>(`${this.BASE_URL}/pendente-aprovacao/${gerenteId}`);
  }

  aprovarCliente(cliente: Cliente): Observable<any> {
    const url = `${this.BASE_URL}/cliente/atualizar/${cliente.conta?.numeroConta}`;
    const body = {
      numeroConta: cliente.conta?.numeroConta,
      aprovada: true,
      motivo: '',
      idCliente: cliente.conta?.idCliente,
      dataCriacao: new Date().toISOString(),
      limite: cliente.conta?.limite,
      idGerente: cliente.conta?.idGerente
    };
    return this.http.put(url, body);
  }

  recusarCliente(cliente: Cliente, motivo: string): Observable<any> {
    const url = `${this.BASE_URL}/cliente/atualizar/${cliente.conta?.numeroConta}`;
    const body = {
      numeroConta: cliente.conta?.numeroConta,
      aprovada: false,
      motivo: motivo,
      idCliente: cliente.conta?.idCliente,
      dataCriacao: new Date().toISOString(),
      limite: cliente.conta?.limite,
      idGerente: cliente.conta?.idGerente
    };
    return this.http.put(url, body);
  }

  getClientes(): Observable<Cliente[]> {
    const cookieValue = this.cookieService.get('usuarioLogado');
    const gerenteId = JSON.parse(cookieValue).gerente.id;
    return this.http.get<any>(`${this.BASE_URL}/clientes/${gerenteId}`).pipe(
      map(response => response.data.map((cliente: any) => new Cliente(
        cliente.cpf,
        cliente.telefone,
        '',
        cliente.salario,
        cliente.conta,
        cliente.endereco,
        cliente.id,
        cliente.nome,
        cliente.email
      )))
    );
  }

  searchCliente(searchTerm: string): Observable<Cliente[]> {
    const cookieValue = this.cookieService.get('usuarioLogado');
    const gerenteId = JSON.parse(cookieValue).gerente.id;
    let apiUrl = `${this.BASE_URL}/clientes/${gerenteId}`;

    if (!isNaN(Number(searchTerm.charAt(0)))) {
      apiUrl += `?cpf=${searchTerm}`;
    } else {
      apiUrl += `?nome=${searchTerm}`;
    }

    return this.http.get<any>(apiUrl).pipe(
      map(response => response.data.map((cliente: any) => new Cliente(
        cliente.cpf,
        cliente.telefone,
        '',
        cliente.salario,
        cliente.conta,
        cliente.endereco,
        cliente.id,
        cliente.nome,
        cliente.email
      )))
    );
  }


  //TODO BUSCAR CLIENTE POR CPF OU NOME
  //consultar cliente especifico por cpf
  // consultar 3 melhores clientes
}
