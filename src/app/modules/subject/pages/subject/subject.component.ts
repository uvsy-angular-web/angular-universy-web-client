import {Component, OnInit} from '@angular/core';
import {SubjectService} from '../../../../core/services/subject.service';
import {Subject} from '../../../../shared/models/subject.model';
import {ButtonText} from '../../../../shared/enums/button-text.enum';
import {NotificationService} from '../../../../shared/modals/notification.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  public subject = new Subject();
  courses = [
    {name: '1k1'},
    {name: '1k2'},
    {name: '1k3'},
    {name: '1k4'},
    {name: '1k5'},
    {name: '1k6'},
    {name: '1k7'}
  ];

  constructor(private subjectService: SubjectService,
              private notificationService: NotificationService) {
  }
  public openDeleteModal() {
    this.notificationService.openConfirmModal(
      'Eliminar materia',
      'Se eliminara la materia y sus comisiones.',
      '¿ Esta seguro que desea eliminarla ?',
      ButtonText.Delete
    ).subscribe(
      (confirm) => {
        // TODO: implement delete subject
      }
    );
  }
  ngOnInit() {
    this.subject = this.subjectService.getCurrentSubject();
  }

}
