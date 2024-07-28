// src/app/redirect/redirect.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-redirect',
  template: ''
})
export class RedirectComponent implements OnInit {

  constructor(private router: Router, private authService: LoginService) { }

  ngOnInit(): void {
    const role = this.authService.usuarioLogado?.cargo;

    if (role === 'CLIENTE') {
      this.router.navigate(['/cliente']);
    } else if (role === 'GERENTE') {
      this.router.navigate(['/gerente']);
    } else if (role === 'ADMIN') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
