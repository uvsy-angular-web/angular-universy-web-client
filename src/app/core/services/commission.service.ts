import { Injectable } from '@angular/core';
import { CRUDEndpointsService } from './system/crud-endpoints.service';
import { EndpointName } from 'src/app/shared/enums/endpoint-name.enum';
import { Endpoint } from 'src/app/models/endpoint.model';
import { Program } from 'src/app/models/program.model';
import { ProgramService } from './program.service';
import { Commission } from 'src/app/models/commission.model';

@Injectable({
  providedIn: 'root'
})
export class CommissionService {
  private endpoint = new Endpoint(EndpointName.COMMISSIONS, EndpointName.PROGRAMS);

  constructor(
    private crudEndpointService: CRUDEndpointsService,
  ) { }

  getCommissions(program: Program) {
    const programId = program ? program.id : this.getProgramId();

    return this.crudEndpointService.getAllFromParent(programId, this.endpoint);
  }

  createCommission(commission: Commission) {
    return this.crudEndpointService.update(this.endpoint, commission.id, commission);
  }

  updateCommission(commission: Commission) {
    return this.crudEndpointService.update(this.endpoint, commission.id, commission);
  }

  deleteCommission(commission: Commission) {
    return this.crudEndpointService.delete(this.endpoint, commission.id);
  }

  addCommission(commission: Commission, program?: Program) {
    const programId = program ? program.id : this.getProgramId();

    return this.crudEndpointService.createOnParent(programId, this.endpoint, commission);
  }

  private getProgramId(): string {
    const currentProgram = ProgramService.getCurrentProgram();
    return currentProgram.id;
  }

}
