import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {ClienteService} from "../../../services/cliente.service";
import {TipoMovimentacao} from "../../../models/tipo-movimentacao.enum";

@Component({
  selector: 'app-movimentacao',
  templateUrl: './movimentacao.component.html',
  styleUrl: './movimentacao.component.scss'
})
export class MovimentacaoComponent implements OnInit {
  title!: string;
  tipoMovimentacao: number = 0;
  valor: number = 0;
  numeroContaCorrenteDestino: number = 0;
  saldoContaCorrente: number = 0;
  contaOrigem: number = 0;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastrService,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.tipoMovimentacao = Number(params['tipoMovimentacao']);
      this.contaOrigem = Number(params['contaOrigem']);
      this.saldoContaCorrente = Number(params['saldo']);
    });
    this.setTitle();
  }

  setTitle() {
    switch (this.tipoMovimentacao) {
      case TipoMovimentacao.DEPOSITO:
        this.title = 'Depósito';
        break;
      case TipoMovimentacao.SAQUE:
        this.title = 'Saque';
        break;
      case TipoMovimentacao.TRANSFERENCIA:
        this.title = 'Transferência';
        break;
      default:
        this.title = 'Erro';
    }
  }

  movimentar() {
    const contaDestino = this.tipoMovimentacao === TipoMovimentacao.TRANSFERENCIA ? this.numeroContaCorrenteDestino : this.contaOrigem;

    this.clienteService.movimentacao(this.tipoMovimentacao, this.valor, this.contaOrigem, contaDestino).subscribe({
      next: (response: any) => {
        this.toastService.success('Movimentação realizada com sucesso!');
        this.router.navigate(['cliente']);
      },
      error: (error: any) => {
        this.toastService.error('Erro ao realizar movimentação.');
        console.error('Error:', error);
      }
    });
  }

  cancelar() {
    this.router.navigate(['cliente']);
  }

  protected readonly TipoMovimentacao = TipoMovimentacao;
}
