import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from "../../models/Usuario.model";
import { Router } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';

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
    private http: HttpClient
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
    this.router.navigate([`admin/editar/${usuario.id}`]);
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
    const url = 'localhost:8083/api/conta/atualizar/' + usuario.conta?.numeroConta;
    const body = {
      numeroConta: usuario.conta?.numeroConta,
      aprovada: true,
      motivo: '',
      idCliente: usuario.conta?.idCliente,
      dataCriacao: new Date().toISOString(),
      limite: usuario.conta?.limite,
      idGerente: usuario.conta?.idGerente
    };

    console.log(body);

    this.http.put(url, body).subscribe({
      next: (response) => {
        console.log('Usuário aprovado com sucesso', response)
      },
      error: (error) => {
        console.error('Erro ao aprovar usuário', error);
      }
    }

  );
    console.log("fez o put");
  }

  recusarUsuario(usuario: Usuario, motivo: string) {
    console.log('Segundo botão clicado', usuario);

    const url = 'localhost:8083/api/conta/atualizar/' + usuario.conta?.numeroConta;
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
        },
        error: (error) => {
          console.error('Erro ao recusar usuário', error);
        }
      }
    );
  }
}
