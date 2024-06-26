import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-self-register',
  templateUrl: './self-register.component.html',
  styleUrl: './self-register.component.scss'
})
export class SelfRegisterComponent {

  hide:boolean= true;
  senha: string = '';
  confirmarSenha: string = '';
  senhaValida: boolean = false;


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

  autocadastrar(formCliente: NgForm){

  }

}
