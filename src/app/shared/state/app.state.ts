import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AppConfigurationStateModel } from './app.model';
import { AddAppConfigurationState } from './app.actions';

export const appConfigurationStoreObjectName = 'appConfiguration';
@State<AppConfigurationStateModel>({
  name: appConfigurationStoreObjectName,
  defaults: {
    version: '1.0.0',
    userName: null
  }
})
export class AppConfigurationState {
  @Selector()
  static getProp(prop) {
    return (state: { [appConfigurationStoreObjectName]: AppConfigurationStateModel }) =>
      state && state[appConfigurationStoreObjectName] && state[appConfigurationStoreObjectName][prop];
  }

  @Action(AddAppConfigurationState)
  addState(ctx: StateContext<AppConfigurationStateModel>, action: AddAppConfigurationState) {
    ctx.patchState({
      // ...ctx.getState(),
      ...action.payload
    });
  }
}
