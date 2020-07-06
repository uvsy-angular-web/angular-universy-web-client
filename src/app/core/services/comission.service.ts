import { Injectable } from '@angular/core';
import { CRUDEndpointsService } from './system/crud-endpoints.service';
import { EndpointName } from 'src/app/shared/enums/endpoint-name.enum';
import { Endpoint } from 'src/app/models/endpoint.model';
import { Program } from 'src/app/models/program.model';
import { ProgramService } from './program.service';
import { Commission } from 'src/app/models/comission.model';

@Injectable({
  providedIn: 'root'
})
export class CorrelativeService {
  private endpoint = new Endpoint(EndpointName.COMISSIONS, EndpointName.PROGRAMS);

  constructor(
    private crudEndpointService: CRUDEndpointsService,
  ) { }

  getComissions(program: Program) {
    const programId = program ? program.id : this.getProgramId();

    return this.crudEndpointService.getAllFromParent(programId, this.endpoint);
  }

  createComission(comission: Commission) {
    return this.crudEndpointService.update(this.endpoint, comission.id, comission);
  }

  deleteComission(comission: Commission) {
    return this.crudEndpointService.delete(this.endpoint, comission.id);
  }

  addComission(comission: Commission, program?: Program) {
    const programId = program ? program.id : this.getProgramId();

    return this.crudEndpointService.createOnParent(programId, this.endpoint, comission);
  }

   private getProgramId(): string {
    const currentProgram = ProgramService.getCurrentProgram();
    return currentProgram.id;
  }

}
