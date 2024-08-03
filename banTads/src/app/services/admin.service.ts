import {Injectable} from "@angular/core";
import {Gerente} from "../models/gerente.model";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

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


  //TODO relatorio de clientes
  // inserir gerente
  // remover gerente
  // listar gerentes
  // alterar gerentes

}
