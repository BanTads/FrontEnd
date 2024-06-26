import { Component } from '@angular/core';
import {Login} from "../../../models/login.model";
import {MatDialog} from "@angular/material/dialog";
import {SelfRegisterComponent} from "../self-register/self-register.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  login:Login = new Login();
  emailPattern:string="";
  hide:boolean = true;
  fullHeight = window.innerHeight;

  constructor(
    public dialog: MatDialog
  ) {
  }


  logar():void {}


  openDialog() {
    const dialogRef = this.dialog.open(SelfRegisterComponent, {
      width: '60rem',
      height: '40rem'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}
