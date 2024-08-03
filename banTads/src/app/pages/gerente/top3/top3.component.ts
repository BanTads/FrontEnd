import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GerenteService } from '../../../services/gerente.service';
import { Cliente } from '../../../models/cliente.model';

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

  constructor(private gerenteService: GerenteService) {}

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
    // Implement dialog opening logic here
  }
}
