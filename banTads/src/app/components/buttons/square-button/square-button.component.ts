import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-square-button',
  templateUrl: './square-button.component.html',
  styleUrl: './square-button.component.scss'
})
export class SquareButtonComponent implements OnInit{
  @Input() buttonType!: string;

  buttonIcon!: string;
  buttonText!: string;
  buttonColor!: string;


  ngOnInit() {
    this.setButtonType(this.buttonType);
  }

  setButtonType(buttonType: string) {
    switch (buttonType) {
      case 'saque':
        this.buttonIcon="arrow_upward";
        this.buttonText="Saque";
        this.buttonColor="#1A5280";
        break;
      case 'deposito':
        this.buttonIcon="add";
        this.buttonText="Depósito";
        this.buttonColor="#559958";
        break;
      case 'transferencia':
        this.buttonIcon="sync_alt";
        this.buttonText="Transferência";
        this.buttonColor="#D95409";
        break;
    }
  }

}
