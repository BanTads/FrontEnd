import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from "../../models/Usuario.model";
import { Router } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import {MatDialog} from "@angular/material/dialog";
import {MotivoRecusaComponent} from "./motivo-recusa/motivo-recusa.component";

@Component({
  selector: 'app-gerente',
  templateUrl: './gerente.component.html',
  styleUrls: ['./gerente.component.scss']
})
export class GerenteComponent implements OnInit {
  inputValue: string = '';
  usuarios: Usuario[] = [];
  buttonOne: string = "Aprovar";
  firstButtonColor: string = "btn-green";
  buttonTwo: string = "Recusar";
  secondButtonColor: string = "btn-red";

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private http: HttpClient,
    public dialog: MatDialog
  ) { }

  @ViewChild('table') table: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Usuario>;
  obs!: Observable<Usuario[]>;

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

  openDialog(usuario: Usuario) {
    const dialogRef = this.dialog.open(MotivoRecusaComponent, {
      width: '30rem',
      height: '20rem'
    });
    dialogRef.componentInstance.recusarMotivo.subscribe((motivo: string) => {
      console.log("entrou no subscribe ",motivo);
      this.recusarUsuario(usuario, motivo);
    });
  }

  loadUsuariosPendentes(): void {
    this.http.get<{ data: Usuario[] }>('http://localhost:8084/api/gerente/pendente-aprovacao/1').subscribe({
      next: (response) => {
        this.usuarios = response.data;
        this.dataSource = new MatTableDataSource(this.usuarios);
        this.dataSource.paginator = this.paginator;
        this.obs = this.dataSource.connect();
        this.cdr.detectChanges();
      },
      error: (error) => console.error('There was an error!', error)
    });
  }

  aprovarUsuario(usuario: Usuario) {
    const url = 'http://localhost:8083/api/conta/atualizar/' + usuario.conta?.numeroConta;
    const body = {
      numeroConta: usuario.conta?.numeroConta,
      aprovada: true,
      motivo: '',
      idCliente: usuario.conta?.idCliente,
      dataCriacao: new Date().toISOString(),
      limite: usuario.conta?.limite,
      idGerente: usuario.conta?.idGerente
    };

    this.http.put(url, body).subscribe({
      next: (response) => {
        console.log('Usuário aprovado com sucesso', response);
        this.removerUsuarioDaLista(usuario);
      },
      error: (error) => {
        console.error('Erro ao aprovar usuário', error);
      }
    });
  }

  recusarUsuario(usuario: Usuario, motivo: string) {
    const url = 'http://localhost:8083/api/conta/atualizar/' + usuario.conta?.numeroConta;
    const body = {
      numeroConta: usuario.conta?.numeroConta,
      aprovada: false,
      motivo: motivo,
      idCliente: usuario.conta?.idCliente,
      dataCriacao: new Date().toISOString(),
      limite: usuario.conta?.limite,
      idGerente: usuario.conta?.idGerente
    };

    this.http.put(url, body).subscribe({
      next: (response) => {
        console.log('Usuário recusado com sucesso', response);
        this.removerUsuarioDaLista(usuario);
      },
      error: (error) => {
        console.error('Erro ao recusar usuário', error);
      }
    });
  }

  private removerUsuarioDaLista(usuario: Usuario) {
    this.usuarios = this.usuarios.filter(u => u.id !== usuario.id);
    this.dataSource.data = this.usuarios;
    this.cdr.detectChanges();
  }
}
