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
import { ProgramReport } from 'src/app/models/program-report.model';

const CURRENT_PROGRAM_KEY = 'current-program';
const PROGRAM_OVERLAPED_CODE = 409;

const ADD_PROGRAM_ERROR_TITLE = 'No se pudo agregar el programa';
const ADD_PROGRAM_DEFAULT_ERROR_MESSAGE = 'Ocurrió un error tratando de agregar un nuevo plan. Intentalo nuevamente más tarde.';
const EDIT_PROGRAM_ERROR_MESSAGE = 'Ocurrió un error tratando de modificar el plan. Intentalo nuevamente más tarde.';
const EDIT_PROGRAM_ERROR_TITLE = 'No se pudo modificar el programa';
const OVERLAPED_PROGRAM_ERROR_MESSAGE = 'Verifica que el periodo ingresado sea válido, al parecer ya existe un plan para ese rango de años';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  private endpoint = new Endpoint(EndpointName.PROGRAMS, EndpointName.CAREERS);

  constructor(
    private crudEndpointService: CRUDEndpointsService,
    private notificationService: ModalService) {
  }

  public addProgram(program: Program) {
    const careerId = this.getCareerId();
    return this.crudEndpointService
      .createOnParent(careerId, this.endpoint, program)
      .pipe(catchError(err =>
        this.handleError(
          err,
          ADD_PROGRAM_DEFAULT_ERROR_MESSAGE,
          ADD_PROGRAM_ERROR_TITLE
        )));
  }

  public getPrograms(): Observable<Program[]> {
    const careerId = this.getCareerId();

    return this.crudEndpointService.getAllFromParent(careerId, this.endpoint);
  }

  public getProgramsByCareer(career: Career): Observable<Program[]> {
    return this.crudEndpointService.getAllFromParent(career.id, this.endpoint);
  }

  public getProgramStatById(programId: string): Observable<ProgramReport> {
    return this.crudEndpointService.getReport(this.endpoint, programId);
  }

  public deleteProgram(program: Program) {
    return this.crudEndpointService.delete(this.endpoint, program.id);
  }

  public updateProgram(program: Program) {
    return this.crudEndpointService
      .update(this.endpoint, program.id, program)
      .pipe(catchError(err =>
        this.handleError(
          err,
          EDIT_PROGRAM_ERROR_MESSAGE,
          EDIT_PROGRAM_ERROR_TITLE
        )));
  }

  public publishProgram(program: Program) {
    program.active = true
    return this.crudEndpointService.update(this.endpoint, program.id, program);
  }

  private handleError(
    error: any, defaultMessage: string, defaultTitle: string) {
    let message = defaultMessage;

    if (error.status === PROGRAM_OVERLAPED_CODE) {
      message = OVERLAPED_PROGRAM_ERROR_MESSAGE;
    }

    this.notificationService.showError(message, defaultTitle);
    return throwError(error);
  }

  private getCareerId(): string {
    const currentInstitution = CareerService.getCurrentCareer();
    return currentInstitution.id;
  }

  public static checkIfIsCurrentPeriod(program: Program): boolean {
    const currentYear = new Date().getFullYear();

    if (program.yearTo) {
      return program.yearTo >= currentYear &&
        program.yearFrom <= currentYear;
    } else {
      return true;
    }
  }

  public static setCurrentProgram(program: Program) {
    LocalStorageService.saveObjectInLocalStorage(CURRENT_PROGRAM_KEY, program);
  }

  public static getCurrentProgram(): Program {
    return LocalStorageService.getObjectFromInLocalStorage(CURRENT_PROGRAM_KEY) as Program;
  }
}
