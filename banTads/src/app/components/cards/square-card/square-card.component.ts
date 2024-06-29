import { Component } from '@angular/core';

@Component({
  selector: 'app-square-card',
  templateUrl: './square-card.component.html',
  styleUrl: './square-card.component.scss'
})
export class SquareCardComponent {

cardTitle= 'Saldo Atual';
cardData= "R$ 10000,00";
dataColor= "#23B99C";
}
