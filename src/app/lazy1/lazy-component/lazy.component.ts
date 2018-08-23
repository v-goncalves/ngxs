/*import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { lazy1StoreObjectName, Lazy1State } from '../state/lazy1.state';
import { AddLazy1ContentState } from '../state/lazy1.actions';
import { generateRandomInt } from '../../utils';

@Component({
  selector: 'app-lazy',
  templateUrl: './lazy.component.html',
  styleUrls: ['./lazy.component.scss']
})
export class LazyComponent {
  lazy1StoreObjectName = lazy1StoreObjectName;

  @Select(Lazy1State) lazy1State$: Observable<object>;

  // whole state object
  @Select(s => s)
  wholeState$: Observable<object>;

  constructor(private store: Store) {}

  updateLazy1ContentAsRandom() {
    this.store.dispatch(new AddLazy1ContentState({ content: `lazy1_content_changed_${generateRandomInt(1, 100)}` }));
  }
}*/

// ===========================================================================
// === USING "StateService" Service (no references to Ngxs)
// ===========================================================================
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { lazy1StoreObjectName } from '../state/lazy1.state';
import { generateRandomInt } from '../../utils';

// services
import { StateService } from '../../core/state.service';

// models
import { Lazy1SateModel } from '../state/lazy1.model';

// decorators
import { LogClassMethods } from '../../decorators/log.decorator';

@Component({
  selector: 'app-lazy',
  templateUrl: './lazy.component.html',
  styleUrls: ['./lazy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@LogClassMethods()
export class LazyComponent {
  lazy1StoreObjectName = lazy1StoreObjectName;

  lazy1State$: Observable<Lazy1SateModel>;
  wholeState$: Observable<object>;

  constructor(private stateService: StateService) {
    this.lazy1State$ = this.stateService.getStateBySelector(this.stateService.selectors.lazy1);
    this.wholeState$ = this.stateService.getStateBySelector(this.stateService.selectors.wholeState);
  }

  updateLazy1ContentAsRandom() {
    this.stateService.dispatchAction<Lazy1SateModel>(this.stateService.action.AddLazy1ContentState, {
      content: `lazy1_content_changed_${generateRandomInt(1, 100)}`
    });
  }
}
