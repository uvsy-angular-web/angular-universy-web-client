import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Program } from '../../models/program.model';
import { CareerService } from './career.service';
import { LocalStorageService } from './local-storage.service';
import { Career } from 'src/app/models/career.model';
import { CRUDEndpointsService } from './system/crud-endpoints.service';
import { EndpointName } from 'src/app/shared/enums/endpoint-name.enum';
import { Endpoint } from 'src/app/models/endpoint.model';

const CURRENT_PROGRAM_KEY = 'current-program';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  private endpoint = new Endpoint(EndpointName.PROGRAMS, EndpointName.CAREERS);

  constructor(
    private crudEndpointService: CRUDEndpointsService) {
  }

  addProgram(program: Program) {
    return this.crudEndpointService.createOnParent(program.careerId, this.endpoint, program);
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
