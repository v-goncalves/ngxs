/*import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { AppConfigurationState, appConfigurationStoreObjectName } from '../shared/state/app.state';
import { AddAppConfigurationState } from '../shared/state/app.actions';

import { generateRandomInt } from '../utils';
import { LogClassMethods } from '../decorators/log.decorator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
@LogClassMethods()
export class HomeComponent {
  stateSnapshot: object;
  appConfigurationStoreObjectName = appConfigurationStoreObjectName;

  @Select(AppConfigurationState) appConfigurationState$: Observable<AppConfigurationState>;

  @Select(AppConfigurationState.getProp('userName'))
  userName$: Observable<string>;

  @Select(state => state && state.router && state.router.state)
  routerState$: Observable<object>;

  // whole state object
  @Select(s => s)
  wholeState$: Observable<object>;

  constructor(private store: Store) {
    this.stateSnapshot = this.store.snapshot();
  }

  updateUserNameAsRandom() {
    this.store.dispatch(new AddAppConfigurationState({ userName: `user_name_${generateRandomInt(1, 100)}` }));
  }
}*/

// ===========================================================================
// === USING "StateService" Service (no references to Ngxs)
// ===========================================================================
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// services
import { StateService } from '../core/state.service';

import { generateRandomInt } from '../utils';

// models
import { appConfigurationStoreObjectName } from '../shared/state/app.state';
import { AppConfigurationStateModel } from '../shared/state/app.model';

// decorators
import { LogClassMethods } from '../decorators/log.decorator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@LogClassMethods()
export class HomeComponent {
  stateSnapshot: object;
  appConfigurationStoreObjectName = appConfigurationStoreObjectName;

  appConfigurationState$: Observable<AppConfigurationStateModel>;
  userName$: Observable<string>;
  routerState$: Observable<object>;
  wholeState$: Observable<object>;

  constructor(private stateService: StateService, private store: Store) {
    this.stateSnapshot = this.store.snapshot();
    this.userName$ = new Observable<string>(userNameObserver => {
      this.appConfigurationState$ = this.stateService.getStateBySelector(this.stateService.selectors.appConfiguration).pipe(
        tap((appConfiguration: AppConfigurationStateModel) => {
          userNameObserver.next(appConfiguration.userName);
        })
      );
    });
    this.routerState$ = this.stateService.getStateBySelector(this.stateService.selectors.router);
    this.wholeState$ = this.stateService.getStateBySelector(this.stateService.selectors.wholeState);
  }

  updateUserNameAsRandom() {
    this.stateService.dispatchAction<AppConfigurationStateModel>(this.stateService.action.AddAppConfigurationState, {
      userName: `user_name_${generateRandomInt(1, 100)}`
    });
  }
}
