import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

// state
import { appConfigurationStoreObjectName } from '../shared/state/app.state';
import { lazy1StoreObjectName } from '../lazy1/state/lazy1.state';

// state - actions
import { AddAppConfigurationState } from '../shared/state/app.actions';
import { AddLazy1ContentState } from '../lazy1/state/lazy1.actions';

// decorators
import { LogClassMethods } from '../decorators/log.decorator';
// import { LogClassMethods } from '../decorators/test-class.decorator';

// all types of possible actions
type StateAction = AddAppConfigurationState | AddLazy1ContentState;

interface Class<ActionObject, Payload> {
  new (agr: Payload): ActionObject;
}

type StateSelectorsFn = (state: any, ...states: any[]) => any;
interface StateSelectors {
  wholeState: StateSelectorsFn;
  router: StateSelectorsFn;
  appConfiguration: StateSelectorsFn;
  lazy1: StateSelectorsFn;
}

@Injectable({
  providedIn: 'root'
})
@LogClassMethods()
export class StateService {
  // all selectors
  public selectors: StateSelectors = {
    wholeState: state => state,
    router: state => state && state['router'],
    appConfiguration: state => state && state[appConfigurationStoreObjectName],
    lazy1: state => state && state[lazy1StoreObjectName]
  };
  // all actions
  public action = {
    AddAppConfigurationState: AddAppConfigurationState,
    AddLazy1ContentState: AddLazy1ContentState
  };

  constructor(private store: Store) {}

  getStateBySelector<T>(selector: (state: any, ...states: any[]) => T): Observable<T> {
    return this.store.select<T>(selector);
  }

  getStateOnceBySelector<T>(selector: (state: any, ...states: any[]) => T): Observable<T> {
    return this.store.selectOnce<T>(selector);
  }

  getStateSnapshotBySelector<T>(selector: (state: any, ...states: any[]) => T): T {
    return this.store.selectSnapshot<T>(selector);
  }

  getSnapshot(): any {
    return this.store.snapshot();
  }

  dispatchAction<Payload>(ActionClass: Class<StateAction, Payload>, payload: Payload) {
    this.store.dispatch(new ActionClass(payload));
  }
}
