import { Component, OnInit } from '@angular/core';
import { Usuario } from "../../models/usuario.model";
import { Router } from "@angular/router";
import {Login} from "../../models/login.model";
import {LoginService} from "../../services/login.service";


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  exibir: boolean = true;
  displayName = '';

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.loadUserDetails();
  }

  loadUserDetails(): void {
    const usuarioLogado = this.loginService.usuarioLogado;
    if(usuarioLogado?.nome){
      this.displayName = usuarioLogado?.nome;
    } else {
      this.displayName= "Usuário Desconhecido";
    }
  }
}
