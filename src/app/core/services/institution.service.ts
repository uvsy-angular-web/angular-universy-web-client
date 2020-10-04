import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs-compat/add/operator/map';
import { LocalStorageService } from './local-storage.service';
import { Institution } from '../../models/institution.model';
import { Endpoint } from 'src/app/models/endpoint.model';
import { EndpointName } from 'src/app/shared/enums/endpoint-name.enum';
import { CRUDEndpointsService } from './system/crud-endpoints.service';
import { NavigationService } from './system/navigation.service';
import { InstitutionReport } from 'src/app/models/institution-report.model';
import { ModalService } from 'src/app/modals/modal.service';

const FIRST_INSTITUTION_INDEX = 0;
const CURRENT_INSTITUTION_KEY = 'current-institution';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {
  private endpoint = new Endpoint(EndpointName.INSTITUTIONS);

  constructor(
    private crudEndpointsService: CRUDEndpointsService,
    private notificationService: ModalService,
    private navigationService: NavigationService,
  ) {
  }

  getInstitution(): Observable<Institution> {
    return this.getAllInstitutions().map(
      (institutions: Institution[]) => institutions[FIRST_INSTITUTION_INDEX]
    );
  }

  getAllInstitutions(): Observable<Institution[]> {
    return this.crudEndpointsService.getAll(this.endpoint);
  }

  getCurrentInstitutionReport(): Observable<InstitutionReport> {
    try {
      const currentInstitutionId =
        InstitutionService.getCurrentInstitution().id
      return this.crudEndpointsService.getReport(this.endpoint, currentInstitutionId);
    } catch (e) {
      this.notificationService.showError('Ocurrió un error tratando de obtener las estadísticas');
    }
  }

  setDefaultInstitution() {
    this.getInstitution().subscribe(
      (institution: Institution) => {
        InstitutionService.setCurrentInstitution(institution);
        this.navigationService.navigateToInstitutionPage(true);
      }
    );
  }

  static getCurrentInstitution(): Institution {
    return LocalStorageService.getObjectFromInLocalStorage(CURRENT_INSTITUTION_KEY) as Institution;
  }

  static setCurrentInstitution(institution: Institution) {
    LocalStorageService.saveObjectInLocalStorage(CURRENT_INSTITUTION_KEY, institution);
  }
}
