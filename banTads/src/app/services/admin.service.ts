import {Injectable} from "@angular/core";
import {Gerente} from "../models/gerente.model";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Cliente} from "../models/cliente.model";

@Injectable(
  {
    providedIn: 'root'
  })

export class AdminService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  BASE_URL = "http://localhost:3000";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  getGerentes(): Observable<Gerente[]> {
    return this.httpClient.get<any>(`${this.BASE_URL}/admin/dashboard`).pipe(
      map(response => {
        if (response.success) {
          return response.data.map((item: any) =>
            new Gerente(
              item.numeroClientes,
              item.saldoPositivoTotal,
              item.saldoNegativoTotal,
              item.id,
              item.nome
            )
          );
        } else {
          return [];
        }
      })
    );
  }

  getRelatorioClientes(): Observable<Cliente[]> {
    return this.httpClient.get<any>(`${this.BASE_URL}/relatorio`).pipe(
      map(response => {
        if (response.success) {
          console.log("response do service:", response);

          return response.data.map((cliente: any) => {
            const gerenteNome = cliente.gerente && cliente.gerente.nome ? cliente.gerente.nome : '';
            const mappedCliente = new Cliente(
              cliente.cpf,
              '',
              '',
              cliente.salario,
              cliente.conta,
              cliente.endereco,
              cliente.id,
              cliente.nome,
              cliente.email,
              gerenteNome
            );
            console.log("mappedCliente", mappedCliente);
            return mappedCliente; // Ensure the mappedCliente is returned
          });
        } else {
          return [];
        }
      })
    );
  }


  // inserir gerente
  // remover gerente
  // listar gerentes
  // alterar gerentes

}
