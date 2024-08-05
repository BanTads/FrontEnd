import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Gerente } from "../../../models/gerente.model";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AdminService } from "../../../services/admin.service";

@Component({
  selector: 'app-editar-gerente',
  templateUrl: './editar-gerente.component.html',
  styleUrl: './editar-gerente.component.scss'
})
export class EditarGerenteComponent implements OnInit {
  formGerente: FormGroup;
  gerente!: Gerente;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private adminService: AdminService
  ) {
    this.formGerente = this.fb.group({
      nome: [''],
      email: [''],
      cpf: [''],
      telefone: ['']
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      const nome = params['nome'];
      const email = params['email'];
      const telefone = params['telefone'];
      const cpf = params['cpf'];

      console.log("Query Params:", params);

      if (id && nome && email && telefone && cpf) {
        this.gerente = { id, nome, email, telefone, cpf } as Gerente;
        console.log("Gerente received from query params:", this.gerente);
        this.formGerente.patchValue({
          nome: this.gerente.nome,
          email: this.gerente.email,
          cpf: this.gerente.cpf,
          telefone: this.gerente.telefone
        });
      }
    });
  }

  salvar(): void {
    const formValues = this.formGerente.value;
    const gerente = new Gerente(
      0,
      0,
      0,
      formValues.cpf,
      formValues.telefone,
      this.gerente?.id,
      formValues.nome,
      formValues.email
    );

    if (this.gerente?.id) {
      this.adminService.alterarGerente(gerente).subscribe({
        next: response => {
          if (response.success) {
            this.toastr.success('Gerente atualizado com sucesso!');
            this.router.navigate(['/gestao-de-gerentes']);
          } else {
            this.toastr.error('Erro ao atualizar Gerente');
          }
        },
        error: () => {
          this.toastr.error('Erro ao atualizar Gerente');
        }
      });
    } else {
      this.adminService.inserirGerente(gerente).subscribe({
        next: response => {
          if (response.success) {
            this.toastr.success('Gerente criado com sucesso!');
            this.router.navigate(['/gestao-de-gerentes']);
          } else {
            this.toastr.error('Erro ao criar Gerente');
          }
        },
        error: () => {
          this.toastr.error('Erro ao criar Gerente');
        }
      });
    }
  }
}
