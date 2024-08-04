import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square-card',
  templateUrl: './square-card.component.html',
  styleUrl: './square-card.component.scss'
})
export class SquareCardComponent {
  @Input() cardTitle: string = '';
  @Input() cardData: string = '';
  @Input() dataColor: string = '';
}
