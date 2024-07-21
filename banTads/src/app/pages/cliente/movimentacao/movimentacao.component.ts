import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movimentacao',
  templateUrl: './movimentacao.component.html',
  styleUrl: './movimentacao.component.scss'
})
export class MovimentacaoComponent implements OnInit {
  //tipos de movimentação: 
  // 0 - DEPOSITO
  // 1 - SAQUE
  // 2 - TRANSFERENCIA

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.tipoMovimentacao = this.route.snapshot.queryParams['tipoMovimentacao'];
    this.valor = this.route.snapshot.queryParams['valor'];
    this.numeroContaCorrenteDestino = this.route.snapshot.queryParams['numeroContaCorrenteDestino'];
  }
  ngOnInit(): void {
    this.tipoMovimentacao = 0;
    this.setTitle();


  }
  saldoContaCorrente: number = 110;
  title!: string;
  tipoMovimentacao: number = 0;// alterar para 0, 1 ou 2
  valor: number = 0;
  numeroContaCorrenteDestino: number = 0;
  sacar() { }
  depositar() { }
  transferir() { }
  cancelar() { }


  setTitle() {
    switch (this.tipoMovimentacao) {
      case 0:
        this.title = 'Depósito';
        break;
      case 1:
        this.title = 'Saque';
        break;
      case 2:
        this.title = 'Transferência';
        break;
      default:
        this.title = 'Erro';
    }
  }
}
