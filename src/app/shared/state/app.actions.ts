import { AppConfigurationStateModel } from './app.model';

export class AddAppConfigurationState {
  static readonly type = '[AppRoot] Add Root State';
  constructor(public payload: AppConfigurationStateModel) {}
}
