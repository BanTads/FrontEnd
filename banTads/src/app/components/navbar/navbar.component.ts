import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  exibir: boolean = true;
  userRole: string = 'GERENTE'; // Altere para o perfil do usuário logado:
  // 'CLIENTE' | 'GERENTE' | 'ADMIN' ;

  //ALTERAR PRA CRIAR UM USER DO TIPO USER
usuarioLogado: number = 1;

  constructor(
    public dialog: MatDialog,
    private router: Router,
  ) { }



  ngOnInit(): void {

  }

  openDialog(){

  }

  checkRole(role: string): boolean {
    return this.userRole === role;
  }
  logout() {
    //this.loginService.logout();
    this.router.navigate(["login"]);
  }
}
