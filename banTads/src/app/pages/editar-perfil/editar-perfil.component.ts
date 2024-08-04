import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';
import { LoginService } from '../../services/login.service';
import { GeocodingService } from '../../services/geocoding.service'; // Importe o serviço de geocoding

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss']
})
export class EditarPerfilComponent implements OnInit {
  formCliente: FormGroup;
  cliente!: Cliente;
  tipo: string[] = ["Rua", "Avenida", "Alameda", "Travessa", "Praça", "Estrada", "Rodovia", "Viela", "Largo", "Passarela"];
  estado: string[] = [
        "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
        "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
        "RS", "RO", "RR", "SC", "SP", "SE", "TO"
      ];
  addressSuggestions: any[] = [];

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private loginService: LoginService,
    private geocodingService: GeocodingService
  ) {
    this.formCliente = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      cpf: [{ value: '', disabled: true }, Validators.required],
      salario: ['', Validators.required],
      tipo: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      cep: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.carregarCliente();
  }

  carregarCliente() {
    this.clienteService.getClienteByCpf().subscribe({
      next: (cliente: Cliente) => {
        this.cliente = cliente;
        this.formCliente.patchValue({
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
          estado: cliente.endereco.uf
        });
      },
      error: (error: any) => console.error('Erro ao carregar cliente:', error)
    });
  }
  
  salvar() {
    console.log('Formulário:', this.formCliente.value);
    
    if (this.formCliente.valid) {
      const requestBody = {
        nome: this.formCliente.value.nome,
        email: this.formCliente.value.email,
        telefone: this.formCliente.value.telefone,
        salario: this.formCliente.value.salario,
        endereco: {
          tipo: this.formCliente.value.tipo,
          logradouro: this.formCliente.value.logradouro,
          numero: this.formCliente.value.numero,
          complemento: this.formCliente.value.complemento,
          cep: this.formCliente.value.cep,
          cidade: this.formCliente.value.cidade,
          uf: this.formCliente.value.estado
        }
      };
      
      this.clienteService.atualizaClientePorId(this.cliente.id, requestBody).subscribe({
        next: (response) => {
          console.log('Cliente atualizado com sucesso:', response);
          this.loginService.atualizaUsuarioLogado(response);
        },
        error: (error) => console.error('Erro ao atualizar cliente:', error)
      });
    }
      
  }
  
  searchAddress(query: string): void {
    if (query.length > 3) {
      this.geocodingService.getAddressSuggestions(query).subscribe({
        next: (response) => {
          this.addressSuggestions = response;
        },
        error: (error) => console.error('Erro ao buscar sugestões de endereço:', error)
      });
    } else {
      this.addressSuggestions = [];
    }
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchAddress(input.value);
  }

  onAddressSelected(address: any): void {
    this.formCliente.patchValue({
      tipo: address.tipoLogradouro,
      logradouro: address.nomeRua,
      numero: address.numero,
      cep: address.cep,
      cidade: address.cidade,
      estado: address.estado
    });
    this.addressSuggestions = [];
  }
}
