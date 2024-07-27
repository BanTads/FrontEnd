import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Usuario} from "../../models/Usuario.model";
import {Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Observable} from "rxjs";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-gerente',
  templateUrl: './gerente.component.html',
  styleUrl: './gerente.component.scss'
})
export class GerenteComponent implements OnInit{
  inputValue: string = '';
  //usuarioLogado: Usuario = new Usuario();
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
  ngOnInit(): void {
  this.loadUsuariosPendentes();
  }
  @ViewChild('table') table: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Usuario>;
  obs!: Observable<Usuario[]>;




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
    this.http.get<Usuario[]>('http://localhost:8011/api/gerente/pendente-aprovacao/1').subscribe({
      next: (data) => {
        console.log(data);
        this.usuarios = data;
      },
      error: (error) => console.error('There was an error!', error)
    });
  }

}
