import {Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {Cliente} from "../../../models/cliente.model";
import {MatTableDataSource} from "@angular/material/table";
import {AdminService} from "../../../services/admin.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrl: './listar-clientes.component.scss'
})
export class ListarClientesComponent {
  clientes: Cliente[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Cliente>;

  constructor(
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes(): void {
    this.adminService.getRelatorioClientes().subscribe((data: Cliente[]) => {
      console.log("response", data);
      this.clientes = data;
      console.log(this.clientes);
      this.dataSource = new MatTableDataSource(this.clientes);
      this.dataSource.paginator = this.paginator;
    });
  }

  openDialog(cliente: Cliente): void {
    this.router.navigate([`admin/editar/${cliente.cpf}`]);
  }
}

