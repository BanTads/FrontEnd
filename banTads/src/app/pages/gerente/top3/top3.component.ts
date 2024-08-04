import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GerenteService } from '../../../services/gerente.service';
import { Cliente } from '../../../models/cliente.model';
import { ModalClienteComponent } from '../listar-cliente/modal-cliente/modal-cliente.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-top3',
  templateUrl: './top3.component.html',
  styleUrls: ['./top3.component.scss']
})
export class Top3Component implements OnInit {
  usuarios: Cliente[] = [];
  dataSource!: MatTableDataSource<Cliente>;
  buttonOne: string = "Detalhes";

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private gerenteService: GerenteService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadTop3Clientes();
  }

  loadTop3Clientes(): void {
    this.gerenteService.getTop3Clientes().subscribe((data: Cliente[]) => {
      this.usuarios = data;
      this.dataSource = new MatTableDataSource(this.usuarios);
      this.dataSource.paginator = this.paginator;
      console.log("usuarios no componente:", this.usuarios);
    });
  }

  openDialog(cliente: Cliente): void {
    const dialogRef = this.dialog.open(ModalClienteComponent, {
      width: '600px',
      data: cliente
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('O diálogo foi fechado');
    });
  }
  formatCurrency(value: any): string {
    if (value == null) return '';
    
    let numberValue = typeof value === 'number' ? value : parseFloat(value);
    
    const currencyConfig = {
      align: "right",
      allowNegative: true,
      decimal: ",",
      precision: 2,
      prefix: "R$ ",
      suffix: "",
      thousands: "."
    };

    return currencyConfig.prefix + numberValue.toLocaleString('pt-BR', {
      minimumFractionDigits: currencyConfig.precision,
      maximumFractionDigits: currencyConfig.precision
    });
  }
  formatCPF(cpf: string): string {
    if (!cpf) return '';

    cpf = cpf.replace(/\D/g, '');

    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
}
