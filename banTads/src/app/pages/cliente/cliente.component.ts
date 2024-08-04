import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import {ClienteService} from "../../services/cliente.service";
import {Cliente} from "../../models/cliente.model";

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.scss'
})
export class ClienteComponent implements OnInit {
  @Output() tipoMovimentacao: number = 0;

  cliente!: Cliente;
  saldoColor!: string;

  constructor(
    private router: Router,
    private clienteService: ClienteService
  ){}



  ngOnInit(): void {
    this.clienteService.getClienteByCpf().subscribe({
      next: (cliente: Cliente) => {
        this.cliente = cliente;
        if (this.cliente.conta.saldo.saldo < 0) {
          this.saldoColor = 'red';
        } else if (this.cliente.conta.saldo.saldo > 0){
          this.saldoColor = 'green';
        } else {
          this.saldoColor = 'black';
        }
        console.log('Cliente:', this.cliente);
      },
      error: (error) => {
        console.error('Error fetching cliente:', error);
      }
    });
  }

  movimentar(tipoMovimentacao: number) {
    this.router.navigate(['/movimentacao'], { queryParams: { tipoMovimentacao: tipoMovimentacao } });
  }

}
