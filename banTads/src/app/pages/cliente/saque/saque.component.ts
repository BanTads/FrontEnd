import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-saque',
  templateUrl: './saque.component.html',
  styleUrl: './saque.component.scss'
})
export class SaqueComponent implements OnInit {
  @Output() tipoMovimentacao: number = 1;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  sacar() {
    this.tipoMovimentacao = 1;
    this.router.navigate(['/movimentacao'], { queryParams: { tipoMovimentacao: this.tipoMovimentacao } });
  }

}
