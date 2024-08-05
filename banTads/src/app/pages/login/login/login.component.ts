import { Component, OnInit, ViewChild } from '@angular/core';
import {Login} from "../../../models/login.model";
import {MatDialog} from "@angular/material/dialog";
import {SelfRegisterComponent} from "../self-register/self-register.component";
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  @ViewChild('formLogin', {static: false}) formLogin!: NgForm;
  login:Login = new Login();
  emailPattern:string="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  hide:boolean = true;
  message!:string;
  fullHeight = window.innerHeight;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.message = params['error'];
    });
  }

  logar(): void {
    if (this.formLogin.form.valid) {
      this.loginService.login(this.login).subscribe({
              next: (login) => {
          if (this.loginService.usuarioLogado) {
            this.toastr.success('Login efetuado com sucesso!');
            this.router.navigate(['/']);
          }
        },
        error: (error) => {
          this.toastr.warning('Usuário ou senha inválidos ou usuário não cadastrado', 'Erro');
          this.formLogin.form.controls['email'].setErrors({ invalid: true });
          this.formLogin.form.controls['senha'].setErrors({ invalid: true });
        }
      });
  
      this.formLogin.form.controls['email'].valueChanges.subscribe(() => {
        if (this.formLogin.form.controls['email'].dirty || this.formLogin.form.controls['email'].touched) {
          this.formLogin.form.controls['email'].setErrors(null);
        }
      });
  
      this.formLogin.form.controls['senha'].valueChanges.subscribe(() => {
        if (this.formLogin.form.controls['senha'].dirty || this.formLogin.form.controls['senha'].touched) {
          this.formLogin.form.controls['senha'].setErrors(null);
        }
      });
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(SelfRegisterComponent, {
      width: '65rem',
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
