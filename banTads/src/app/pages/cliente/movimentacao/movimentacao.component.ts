import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private toastService: ToastrService
  ) {
    this.tipoMovimentacao = this.route.snapshot.queryParams['tipoMovimentacao'];
    this.valor = this.route.snapshot.queryParams['valor'];
    this.numeroContaCorrenteDestino = this.route.snapshot.queryParams['numeroContaCorrenteDestino'];
  }
  tpMov!: number;
  ngOnInit(): void {
    // this.tipoMovimentacao = 2;
    this.route.queryParams.subscribe(params => {
      this.tipoMovimentacao = Number(params['tipoMovimentacao']);
    });
    this.setTitle();


  }
  saldoContaCorrente: number = 110;
  title!: string;
  tipoMovimentacao: number = 0;// alterar para 0, 1 ou 2
  valor: number = 0;
  numeroContaCorrenteDestino: number = 0;
  sacar() { 
    if (this.valor > this.saldoContaCorrente) {
      this.toastService.error('Saldo insuficiente');
    } else {
      this.saldoContaCorrente -= this.valor;
      this.toastService.success('Saque realizado com sucesso');
    }
  }
  depositar() { 
    this.saldoContaCorrente += this.valor;
    this.toastService.success('Depósito realizado com sucesso');
  }
  transferir() { 
    if (this.valor > this.saldoContaCorrente) {
      this.toastService.error('Saldo insuficiente');
    } else {
      this.saldoContaCorrente -= this.valor;
      this.toastService.success('Transferência realizada com sucesso');
    }
  }
  cancelar() { 
    if (this.tipoMovimentacao == 0) {
      this.router.navigate(['cliente/deposito']);
    } else if (this.tipoMovimentacao == 1) {
      this.router.navigate(['cliente/saque']);
    } else {
      this.router.navigate(['cliente/transferencia']);
    }
  }


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
