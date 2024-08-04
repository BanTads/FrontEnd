import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {Usuario} from "../../../models/usuario.model";
import {Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Observable} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {GerenteService} from "../../../services/gerente.service";
import {Cliente} from "../../../models/cliente.model";
import { CurrencyMaskConfig } from 'ng2-currency-mask';
import { CustomCurrencyMaskConfig } from '../../../app.module';

@Component({
  selector: 'app-consultar-cliente',
  templateUrl: './consultar-cliente.component.html',
  styleUrl: './consultar-cliente.component.scss'
})
export class ConsultarClienteComponent {
  CustomCurrencyMaskConfig: CurrencyMaskConfig = CustomCurrencyMaskConfig;
  inputValue: string = '';
  cliente!: Cliente;
  dataSource!: MatTableDataSource<Usuario>;
  clienteDataSource: Cliente[] = [];

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private gerenteService: GerenteService
  ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

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

  searchClienteByCpf(searchTerm: string): void {
    if (searchTerm.length) {
      this.gerenteService.searchClienteByCpf(searchTerm).subscribe(cliente => {
        if (cliente) {
          this.cliente = cliente;
          this.clienteDataSource = [cliente];
        } else {
          this.toastr.error('Cliente não encontrado');
          this.clienteDataSource = [];
        }
      });
    } else {
      this.toastr.error('O CPF deve ter 11 dígitos');
      this.clienteDataSource = [];
    }
  }

  openDialog(usuario: Usuario) {
    this.router.navigate([`admin/editar/${usuario.id}`]);
  }
}