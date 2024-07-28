import { ChangeDetectorRef, Component, ViewChild, OnInit } from '@angular/core';
import { Gerente} from "../../models/gerente.model";
import { Router } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Observable } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  inputValue: string = '';
  gerentes: Gerente[] = [];
  buttonOne: string = "Detalhes";

  constructor(
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getGerentes();
  }

  @ViewChild('table') table: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Gerente>;
  obs!: Observable<Gerente[]>;

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

  getGerentes() {
    this.http.get<any>('http://localhost:8084/api/gerente/admin/dashboard').subscribe(response => {
      if (response.success) {
        console.log(response.data);
        this.gerentes = response.data.map((item: any) => new Gerente(
          item.numeroClientes,
          item.saldoPositivoTotal,
          item.saldoNegativoTotal,
          item.id,
          item.nome,
          item.email,
          item.cargo
        ));
        this.dataSource = new MatTableDataSource(this.gerentes);
        this.dataSource.paginator = this.paginator;
        this.obs = this.dataSource.connect();
      } else {
        this.toastr.error(response.message);
      }
    }, error => {
      this.toastr.error('Erro ao buscar gerentes');
    });
  }
}
