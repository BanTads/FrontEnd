import { ChangeDetectorRef, Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ClienteService } from '../../../services/cliente.service';
import { ExtratoData, Movimentacao } from '../../../models/tipo-movimentacao.enum';
import { Usuario } from '../../../models/usuario.model';
import { Cliente } from '../../../models/cliente.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.scss']
})
export class ExtratoComponent implements OnInit, OnDestroy {
  inputValue: string = '';
  dataInicio: Date = new Date();
  dataFim: Date = new Date();
  usuarioLogado: Usuario = new Usuario();
  movimentacoes: Movimentacao[] = [];
  contaOrigem!: number;
  cliente!: Cliente;
  dataSource: MatTableDataSource<Movimentacao> = new MatTableDataSource<Movimentacao>();
  displayedColumns: string[] = ['dataHora', 'operacao', 'nomeCliente', 'valor', 'tipo', 'saldoConsolidado'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  obs!: Observable<Movimentacao[]>;

  constructor(
    private cdr: ChangeDetectorRef,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    // Fetch client information on initialization
    this.clienteService.getClienteByCpf().subscribe({
      next: (cliente: Cliente) => {
        this.cliente = cliente;
        this.contaOrigem = this.cliente.conta.numeroConta;
        console.log('Cliente:', this.contaOrigem);

        // Initialize dataSource after paginator is available
        this.dataSource.paginator = this.paginator;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching cliente:', error);
      }
    });
  }

  consultaExtrato(dataInicio: Date, dataFim: Date): void {
    this.clienteService.extrato(this.contaOrigem, dataInicio, dataFim).subscribe({
      next: (data: ExtratoData) => {
        console.log('Movimentações:', data);
        this.movimentacoes = data.extrato;
        this.dataSource.data = this.movimentacoes;
        this.dataSource.paginator = this.paginator;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching extrato:', error);
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    // Disconnect observable from dataSource when component is destroyed
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }
}
