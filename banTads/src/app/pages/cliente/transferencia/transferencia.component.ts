import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrl: './transferencia.component.scss'
})
export class TransferenciaComponent implements OnInit {
  @Output() tipoMovimentacao: number = 1;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }
transferir() {
    this.tipoMovimentacao = 2;
    this.router.navigate(['/movimentacao'], { queryParams: { tipoMovimentacao: this.tipoMovimentacao } });
  }
}
