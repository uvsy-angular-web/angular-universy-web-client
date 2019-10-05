import {ConfigSettings} from './config.settings';

export const environment = {
  production: true,
  baseUrl: ConfigSettings.BASE_URL + ConfigSettings.SAT // TODO: change with the corresponding environment
};
