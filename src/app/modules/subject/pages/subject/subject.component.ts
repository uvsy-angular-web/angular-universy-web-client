import {Component, OnInit} from '@angular/core';
import {SubjectService} from '../../../../core/services/subject.service';
import {Subject} from '../../../../shared/models/subject.model';
import {ButtonText} from '../../../../shared/enums/button-text.enum';
import {NotificationService} from '../../../../shared/modals/notification.service';
import {Router} from '@angular/router';
import {NavigationService} from '../../../../core/services/system/navigation.service';

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
              private navigationService: NavigationService,
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
        this.deleteSubject();
      }
    );
  }


  ngOnInit() {
    this.subject = this.subjectService.getCurrentSubject();
  }

  private deleteSubject() {
    this.subjectService.deleteSubject(this.subject).subscribe(
      () => {
        this.navigationService.navigateToProgramPage();
      },
      (error) => {
        this.notificationService.showError('Ocurrió un error intentando borrar la materia.');
        console.error(error);
      });
  }
}
