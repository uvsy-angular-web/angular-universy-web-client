import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs-compat/add/operator/map';
import { LocalStorageService } from './local-storage.service';
import { Institution } from '../../models/institution.model';
import { Endpoint } from 'src/app/models/endpoint.model';
import { EndpointName } from 'src/app/shared/enums/endpoint-name.enum';
import { CRUDEndpointsService } from './system/crud-endpoints.service';
const FIRST_INSTITUTION_INDEX = 0;
const CURRENT_INSTITUTION_KEY = 'current-institution';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {
  private endpoint = new Endpoint(EndpointName.INSTITUTIONS);

  constructor(
    private crudEndpointsService: CRUDEndpointsService) {
  }

  getInstitution(): Observable<Institution> {
    return this.getAllInstitutions().map(
      (institutions: Institution[]) => institutions[FIRST_INSTITUTION_INDEX]
    );
  }

  getAllInstitutions(): Observable<Institution[]> {
    return this.crudEndpointsService.getAll(this.endpoint);
  }

  getCurrentInstitution(): Institution {
    let currentInstitution = LocalStorageService.getObjectFromInLocalStorage(CURRENT_INSTITUTION_KEY) as Institution;
    if (currentInstitution) { return currentInstitution; }

    this.getInstitution().subscribe(
      (institution: Institution) => {
        currentInstitution = institution;
        InstitutionService.setCurrentInstitution(institution);
      }
    );

    return currentInstitution;
  }

  static setCurrentInstitution(institution: Institution) {
    LocalStorageService.saveObjectInLocalStorage(CURRENT_INSTITUTION_KEY, institution);
  }
}
