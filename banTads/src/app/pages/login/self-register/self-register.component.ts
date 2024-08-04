import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import {AutoCadastroService} from "../../../services/autocadastro.service";
import { ClienteService } from '../../../services/cliente.service';
import { LoginService } from '../../../services/login.service';
import { GeocodingService } from '../../../services/geocoding.service';

@Component({
  selector: 'app-self-register',
  templateUrl: './self-register.component.html',
  styleUrl: './self-register.component.scss'
})
export class SelfRegisterComponent {
  formCliente: FormGroup;
  addressSuggestions: any[] = [];

  constructor(private autocadastroService: AutoCadastroService, private fb: FormBuilder,
    private clienteService: ClienteService,
    private loginService: LoginService,
    private geocodingService: GeocodingService
  ) {
    this.formCliente = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      cpf: [{ value: '',}, Validators.required],
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

  tipo: string[] = [
    "Rua", "Avenida", "Alameda", "Travessa", "Praça",
    "Estrada", "Rodovia", "Viela", "Largo", "Passarela"
  ];

  estado: string[] = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
    "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
    "RS", "RO", "RR", "SC", "SP", "SE", "TO"
  ];

  formData = {
    nome: '', email: '', telefone: '', cpf: '', salario: null,
    tipo: '', logradouro: '', numero: '', complemento: '',
    cep: '', cidade: '', estado: ''
  };

  autocadastrar() {
    
    const formData = this.formCliente.value;
    const requestBody = {
      nome: formData.nome,
      email: formData.email,
      cpf: formData.cpf,
      telefone: formData.telefone,
      salario: formData.salario,
      endereco: {
        tipo: formData.tipo,
        logradouro: formData.logradouro,
        numero: formData.numero,
        complemento: formData.complemento,
        cep: formData.cep,
        cidade: formData.cidade,
        uf: formData.estado
      }
    };
    
    this.autocadastroService.autocadastrar(requestBody).subscribe({
      next: (response: any) => console.log('Cadastro realizado com sucesso!', response),
      error: (error: any) => console.error('Erro ao realizar cadastro:', error)
    });
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
