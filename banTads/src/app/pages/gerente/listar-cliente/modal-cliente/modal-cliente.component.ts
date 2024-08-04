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
    }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  formatCPF(cpf: string): string {
    if (!cpf) return '';
    return cpf.replace(/\D/g, '')
              .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  formatPhone(phone: string): string {
    if (!phone) return '';
    return phone.replace(/\D/g, '')
                .replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }

  formatCEP(cep: string): string {
    if (!cep) return '';
    return cep.replace(/\D/g, '')
              .replace(/(\d{5})(\d{3})/, '$1-$2');
  }

  formatCurrency(value: number | string): string {
    if (value == null) return '';
    const numberValue = typeof value === 'number' ? value : parseFloat(value);
    return 'R$ ' + numberValue.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
  }
  
  

