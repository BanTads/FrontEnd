import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrl: './extrato.component.scss'
})
export class ExtratoComponent {
  inputValue: string = '';
  //usuarioLogado: Usuario = new Usuario();
  usuarios: Usuario[] = [];
  // usuarios: Usuario[] = [
  //   new Usuario(1,'Saque','usuario1@email.com'),
  //   new Usuario(2,'Depósito','usuario2@email.com'),
  //   new Usuario(3,'Transferência','usuario3@email.com'),
  // ];
  buttonOne: string = "Aprovar";
  firstButtonColor: string = "btn-green";
  buttonTwo: string = "Recusar";
  secondButtonColor: string = "btn-red";

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,

  ) { }
  ngOnInit(): void {


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
}
