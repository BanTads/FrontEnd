import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Usuario } from '../../../../models/usuario.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { GerenteService } from '../../../../services/gerente.service';
import { Cliente } from '../../../../models/cliente.model';
import { MatTableDataSource } from '@angular/material/table';
import { CurrencyMaskConfig } from 'ng2-currency-mask';
import { CustomCurrencyMaskConfig } from '../../../../app.module';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-cliente',
  templateUrl: './modal-cliente.component.html',
  styleUrl: './modal-cliente.component.scss'
})
export class ModalClienteComponent implements OnInit {
  CustomCurrencyMaskConfig: CurrencyMaskConfig = CustomCurrencyMaskConfig;
  inputValue: string = '';
  cliente!: Cliente;
  dataSource!: MatTableDataSource<Usuario>;
  clienteDataSource: Cliente[] = [];

  constructor(
    public dialogRef: MatDialogRef<ModalClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private router: Router,
    private gerenteService: GerenteService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // this.loadCliente();
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  // loadCliente(idCliente: Cliente): void {
  //   this.gerenteService.searchCliente(idCliente.id).subscribe(
  //     cliente => {
  //       if (cliente) {
  //         this.cliente = cliente;
  //         this.clienteDataSource = [cliente];
  //       } else {
  //         this.toastr.error('Cliente não encontrado');
  //         this.clienteDataSource = [];
  //       }
  //     }
  //   );
  //   )
  }
  
  

