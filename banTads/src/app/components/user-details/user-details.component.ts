import { Component } from '@angular/core';
import {Usuario} from "../../models/Usuario.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {
  exibir: boolean = true;
  userName = "Leonardo Hortmann";
  usuarioLogado: Usuario = new Usuario();

  grr = "";
  name = this.userName.split(/[, ]+/);
  displayName = 'Leonardo Hortmann';

  constructor(
    private router: Router
  ) { }


  logout(){
    this.router.navigate(["login"]);
  }


}
