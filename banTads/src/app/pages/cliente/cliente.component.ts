import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.scss'
})
export class ClienteComponent implements OnInit {
  @Output() tipoMovimentacao: number = 0;
  constructor(private router: Router
  ){}

ngOnInit(): void {

}
  movimentar(tipoMovimentacao: number) {
    switch (tipoMovimentacao) {
      case 0:
        this.router.navigate(['/movimentacao'], { queryParams: { tipoMovimentacao: tipoMovimentacao } });
        break;
      case 1:
        this.router.navigate(['/movimentacao'], { queryParams: { tipoMovimentacao: tipoMovimentacao } });
        break;
      case 2:
        this.router.navigate(['/movimentacao'], { queryParams: { tipoMovimentacao: tipoMovimentacao } });
        break;
      default:
        break;
    }
  }

}
