import { Component, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deposito',
  templateUrl: './deposito.component.html',
  styleUrl: './deposito.component.scss'
})
export class DepositoComponent {

  @Output() tipoMovimentacao: number = 0;
constructor(
    private router: Router){

    }

  //abrir componente movimentação e enviar a informação de que é um depósito, saque ou transferência usando output para o componente movimentação receber um input
  depositar() {
    this.tipoMovimentacao = 0;
    this.router.navigate(['/movimentacao'], { queryParams: { tipoMovimentacao: this.tipoMovimentacao } });
  }
}
