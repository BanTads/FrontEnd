import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-self-register',
  templateUrl: './self-register.component.html',
  styleUrl: './self-register.component.scss'
})

export class SelfRegisterComponent {
  constructor(private http: HttpClient) {}



  tipo: string[] = [
    "Rua",
    "Avenida",
    "Alameda",
    "Travessa",
    "Praça",
    "Estrada",
    "Rodovia",
    "Viela",
    "Largo",
    "Passarela"
  ];

  estado: string[] = [
    "AC", "AL", "AP", "AM", "BA",
    "CE", "DF", "ES", "GO", "MA",
    "MT", "MS", "MG", "PA", "PB",
    "PR", "PE", "PI", "RJ", "RN",
    "RS", "RO", "RR", "SC", "SP",
    "SE", "TO"
  ];

  formData = {
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    salario: null,
    tipo: '',
    logradouro: '',
    numero: '',
    complemento: '',
    cep: '',
    cidade: '',
    uf: ''
  };



  autocadastrar(formCliente: NgForm) {
    const formData = formCliente.value;
    console.log(formCliente.value);
    console.log(formData);
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
        cidade: formData.cidade, // Assuming you need to add fields for cidade and uf in your form
        uf: formData.uf
      }
    };

    this.http.post('http://localhost:8009/api/autocadastro', requestBody).subscribe({
      next: (response) => console.log('Cadastro realizado com sucesso!', response),
      error: (error) => console.error('Erro ao realizar cadastro:', error)
    });

  }



}
