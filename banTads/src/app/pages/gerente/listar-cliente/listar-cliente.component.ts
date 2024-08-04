import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Usuario} from "../../../models/usuario.model";
import {Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {GerenteService} from "../../../services/gerente.service";
import {Cliente} from "../../../models/cliente.model";
import {ToastrService} from "ngx-toastr";
import { MatDialog } from '@angular/material/dialog';
import { ModalClienteComponent } from './modal-cliente/modal-cliente.component';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrl: './listar-cliente.component.scss'
})
export class ListarClienteComponent implements OnInit {
  inputValue: string = '';
  usuarios: Cliente[] = [];
  buttonOne: string = "Detalhes";
  firstButtonColor: string = "btn-green";
  buttonTwo: string = "Recusar";
  secondButtonColor: string = "btn-red";

  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router,
    private gerenteService: GerenteService
  ) { }

  @ViewChild('table') table: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Cliente>;

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes(): void {
    this.gerenteService.getClientes().subscribe((data: Cliente[]) => {
      this.usuarios = data;
      this.dataSource = new MatTableDataSource(this.usuarios);
      this.dataSource.paginator = this.paginator;
    });
  }

  searchCliente(searchTerm: string): void {
    this.gerenteService.searchCliente(searchTerm).subscribe((data: Cliente[]) => {
      if (data.length > 0) {
        this.usuarios = data;
        this.dataSource = new MatTableDataSource(this.usuarios);
        this.dataSource.paginator = this.paginator;
      } else {
        this.toastr.error('Cliente não encontrado');
      }
    });
  }

  applyFilter(event: Event) {
    if (this.dataSource) {
      this.inputValue = (event.target as HTMLInputElement).value;
      const filterValue = this.inputValue.trim().toLowerCase();
      this.dataSource.filter = filterValue;
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
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
}
