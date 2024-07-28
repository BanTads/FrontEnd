import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-motivo-recusa',
  templateUrl: './motivo-recusa.component.html',
  styleUrl: './motivo-recusa.component.scss'
})
export class MotivoRecusaComponent {

  @Output() recusarMotivo = new EventEmitter<string>();
  formData = { motivo: '' };

  recusar(form: any) {
    if (form.valid) {
      this.recusarMotivo.emit(this.formData.motivo);
    }
  }
}
