import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  exibir: boolean = true;
  userRole!: string;
  usuarioLogado: number = 1;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.userRole = this.loginService.usuarioLogado!.cargo
  }

  checkRole(role: string): boolean {
    return this.userRole === role;
  }
  logout() {
    this.loginService.logout();
    this.router.navigate(["/login"]);
  }
}
