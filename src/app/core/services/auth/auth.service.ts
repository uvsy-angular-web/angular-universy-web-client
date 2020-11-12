import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../models/user.model';
import { NavigationService } from '../system/navigation.service';
import { LocalStorageService } from '../local-storage.service';
import { CURRENT_USER_KEY } from './constants/auth.constants';
import { InstitutionService } from '../institution.service';
import { Auth } from 'aws-amplify';
import { ModalService } from 'src/app/modals/modal.service';
const USER_NOT_VALID_ERROR = 'El email o la contraseña no son validos.';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(
    private http: HttpClient,
    private notificationService: ModalService,
    private navigationService: NavigationService,
    private institutionService: InstitutionService,
  ) {
  }

  async login(user: User) {
    if (user) {
      try {
        const userFromAws = await Auth.signIn(user.username, user.password);
        user.token = userFromAws.signInUserSession.accessToken.jwtToken;
        AuthService.setCurrentUser(user);
        this.institutionService.setDefaultInstitution();
      }
      catch {
        this.notificationService.showError(USER_NOT_VALID_ERROR);
      }
    }
  }

  logout() {
    localStorage.removeItem(CURRENT_USER_KEY);

    this.navigationService.navigateToHomePage();
  }

  public static isLoggedIn() {
    return LocalStorageService.getObjectFromInLocalStorage(CURRENT_USER_KEY);
  }

  private static setCurrentUser(user: User) {
    LocalStorageService.saveObjectInLocalStorage(CURRENT_USER_KEY, user);
  }

  public static getCurrentUser(): User {
    return LocalStorageService.getObjectFromInLocalStorage(CURRENT_USER_KEY) as User;
  }
}
