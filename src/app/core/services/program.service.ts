import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Program } from '../../models/program.model';
import { CareerService } from './career.service';
import { LocalStorageService } from './local-storage.service';
import { Career } from 'src/app/models/career.model';
import { CRUDEndpointsService } from './system/crud-endpoints.service';
import { EndpointName } from 'src/app/shared/enums/endpoint-name.enum';
import { Endpoint } from 'src/app/models/endpoint.model';
import { ModalService } from 'src/app/modals/modal.service';
import { catchError } from 'rxjs/operators';

const CURRENT_PROGRAM_KEY = 'current-program';
const PROGRAM_OVERLAPED_CODE = 409;

const ADD_PROGRAM_ERROR_MESSAGE = 'Ocurrió un error tratando de agregar un nuevo plan.';
const OVERLAPED_PROGRAM_ERROR_MESSAGE = 'Verifica que el periodo ingresado sea válido, al parecer ya existe un plan para ese rango de años';
const OVERLAPED_PROGRAM_ERROR_TITLE = 'No se pudo agregar el programa';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  private endpoint = new Endpoint(EndpointName.PROGRAMS, EndpointName.CAREERS);

  constructor(
    private crudEndpointService: CRUDEndpointsService,
    private notificationService: ModalService) {
  }

  addProgram(program: Program) {
    const careerId = this.getCareerId();
    return this.crudEndpointService.
      createOnParent(careerId, this.endpoint, program)
      .pipe(
        catchError(
          err => {
            if (err.status === PROGRAM_OVERLAPED_CODE) {
              this.notificationService.showError(OVERLAPED_PROGRAM_ERROR_MESSAGE, OVERLAPED_PROGRAM_ERROR_TITLE);
            } else {
              this.notificationService.showError(ADD_PROGRAM_ERROR_MESSAGE);
            }
            return throwError(err);
          }
        ));
  }

  getPrograms(): Observable<Program[]> {
    const careerId = this.getCareerId();

    return this.crudEndpointService.getAllFromParent(careerId, this.endpoint);
  }

  getProgramsByCareer(career: Career): Observable<Program[]> {
    return this.crudEndpointService.getAllFromParent(career.id, this.endpoint);
  }

  deleteProgram(program: Program) {
    return this.crudEndpointService.delete(this.endpoint, program.id);
  }

  updateProgram(program: Program) {
    return this.crudEndpointService.update(this.endpoint, program.id, program);
  }

  publishProgram(program: Program) {
    return this.crudEndpointService.activate(this.endpoint, program.id);
  }

  private getCareerId(): string {
    const currentInstitution = CareerService.getCurrentCareer();
    return currentInstitution.id;
  }

  static setCurrentProgram(program: Program) {
    LocalStorageService.saveObjectInLocalStorage(CURRENT_PROGRAM_KEY, program);
  }

  static getCurrentProgram(): Program {
    return LocalStorageService.getObjectFromInLocalStorage(CURRENT_PROGRAM_KEY) as Program;
  }
}
