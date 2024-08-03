import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from "../../models/cliente.model";
import { Router } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Observable } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { MotivoRecusaComponent } from "./motivo-recusa/motivo-recusa.component";
import { GerenteService } from '../../services/gerente.service';

@Component({
  selector: 'app-gerente',
  templateUrl: './gerente.component.html',
  styleUrls: ['./gerente.component.scss']
})
export class GerenteComponent implements OnInit {
  inputValue: string = '';
  clientes: Cliente[] = [];
  buttonOne: string = "Aprovar";
  firstButtonColor: string = "btn-green";
  buttonTwo: string = "Recusar";
  secondButtonColor: string = "btn-red";

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private gerenteService: GerenteService,
    public dialog: MatDialog
  ) { }

  @ViewChild('table') table: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Cliente>;
  obs!: Observable<Cliente[]>;

  ngOnInit(): void {
    this.loadUsuariosPendentes();
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
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

  openDialog(cliente: Cliente) {
    const dialogRef = this.dialog.open(MotivoRecusaComponent, {
      width: '30rem',
      height: '20rem'
    });
    dialogRef.componentInstance.recusarMotivo.subscribe((motivo: string) => {
      console.log("entrou no subscribe ", motivo);
      this.recusarCliente(cliente, motivo);
    });
  }

  loadUsuariosPendentes(): void {
    this.gerenteService.loadUsuariosPendentes().subscribe({
      next: (response) => {
        this.clientes = response.data;
        this.dataSource = new MatTableDataSource(this.clientes);
        this.dataSource.paginator = this.paginator;
        this.obs = this.dataSource.connect();
        this.cdr.detectChanges();
      },
      error: (error) => console.error('There was an error!', error)
    });
  }

  aprovarCliente(cliente: Cliente) {
    this.gerenteService.aprovarCliente(cliente).subscribe({
      next: (response) => {
        console.log('Usuário aprovado com sucesso', response);
        this.removerUsuarioDaLista(cliente);
      },
      error: (error) => {
        console.error('Erro ao aprovar usuário', error);
      }
    });
  }

  recusarCliente(cliente: Cliente, motivo: string) {
    this.gerenteService.recusarCliente(cliente, motivo).subscribe({
      next: (response) => {
        console.log('Usuário recusado com sucesso', response);
        this.removerUsuarioDaLista(cliente);
      },
      error: (error) => {
        console.error('Erro ao recusar usuário', error);
      }
    });
  }

  private removerUsuarioDaLista(cliente: Cliente) {
    this.clientes = this.clientes.filter(c => c.id !== cliente.id);
    this.dataSource.data = this.clientes;
    this.cdr.detectChanges();
  }
}
