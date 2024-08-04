import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss']
})
export class EditarPerfilComponent implements OnInit {
  constructor(private clienteService: ClienteService, private loginService: LoginService) { }

  formData = {
    nome: '', email: '', telefone: '', cpf: '', salario: 0,
    tipo: '', logradouro: '', numero: '', complemento: '',
    cep: '', cidade: '', uf: ''
  }

  tipo: string[] = [
    "Rua", "Avenida", "Alameda", "Travessa", "Praça",
    "Estrada", "Rodovia", "Viela", "Largo", "Passarela"
  ];

  estado: string[] = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
    "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
    "RS", "RO", "RR", "SC", "SP", "SE", "TO"
  ];

  hide: boolean = true;
  senha: string = '';
  confirmarSenha: string = '';
  senhaValida: boolean = false;
  cliente!: Cliente;

  ngOnInit(): void {
    this.carregarCliente();
  }

  carregarCliente() {
    this.clienteService.getClienteByCpf().subscribe({
      next: (cliente: Cliente) => {
        this.cliente = cliente;
        this.formData = {
          nome: cliente.nome,
          email: cliente.email,
          telefone: cliente.telefone,
          cpf: cliente.cpf,
          salario: cliente.salario,
          tipo: cliente.endereco.tipo,
          logradouro: cliente.endereco.logradouro,
          numero: cliente.endereco.numero,
          complemento: cliente.endereco.complemento,
          cep: cliente.endereco.cep,
          cidade: cliente.endereco.cidade,
          uf: cliente.endereco.uf
        };
      },
      error: (error: any) => console.error('Erro ao carregar cliente:', error)
    });
  }

  verificarSenha() {
    const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;

    if (
      senhaRegex.test(this.senha) &&
      this.senha === this.confirmarSenha
    ) {
      this.senhaValida = true;
    } else {
      this.senhaValida = false;
    }
  }

  salvar(formCliente: NgForm) {
    if (formCliente.valid && this.senhaValida) {
      const clienteAtualizado: Cliente = {
        ...this.cliente,
        nome: this.formData.nome,
        email: this.formData.email,
        telefone: this.formData.telefone,
        cpf: this.formData.cpf,
        salario: this.formData.salario,
        endereco: {
          id: this.cliente.endereco.id,
          tipo: this.formData.tipo,
          logradouro: this.formData.logradouro,
          numero: this.formData.numero,
          complemento: this.formData.complemento,
          cep: this.formData.cep,
          cidade: this.formData.cidade,
          uf: this.formData.uf
        }
      };

      console.log('Atualizando cliente:', clienteAtualizado);

      this.clienteService.atualizaClientePorId(clienteAtualizado).subscribe({
        next: (res) => console.log('Cliente atualizado com sucesso', res),
        error: (err) => console.error('Erro ao atualizar cliente:', err)
      });
    } else {
      console.log('Formulário inválido ou senhas não conferem');
    }
  }

  autocadastrar(formCliente: NgForm) {
    // Lógica adicional para auto-cadastro se necessário
  }
}
