import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { ModalService } from 'src/app/modals/modal.service';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private notificationService: ModalService) { }

  async sendEmail(institutionName: string, institutionEmail: string, message: string): Promise<any> {
    const emailData = {
      institution_name: institutionName,
      institution_email: institutionEmail,
      message
    };

    return emailjs.send('service_uf2bx2t', 'template_m99hjho', emailData, 'user_xok47xUGUAYCpLHtrwWow')
      .catch(
        () => this.notificationService.showError('Ocurrió un error al tratar de enviar el mail de contacto. Intentá nuevamente más tarde', 'No se pudo enviar el mail')
    );
  }

}
