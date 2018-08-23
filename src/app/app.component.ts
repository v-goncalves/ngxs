/*import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';

// decorators
import { LogClassMethods } from './decorators/log.decorator';

interface LinkList {
  text: string;
  routerLink: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@LogClassMethods()
export class AppComponent implements OnDestroy {
  appName = 'Ngxs App - Demo';
  linkList: LinkList[] = [];
  submenus: LinkList[] = [];
  wholeStateSubscription: Subscription;

  constructor(private store: Store) {
    this.submenus = [{ text: 'About', routerLink: '.' }, { text: 'Terms and Conditions', routerLink: '.' }];
    this.linkList = [
      {
        text: `Home`,
        routerLink: 'home'
      },
      {
        text: `Lazy1`,
        routerLink: 'lazy1'
      }
    ];

    this.wholeStateSubscription = this.store.select(state => state).subscribe(state => this.appStoreChanged(state));
  }

  ngOnDestroy() {
    this.wholeStateSubscription.unsubscribe();
  }

  private appStoreChanged(v) {}
}*/

// ===========================================================================
// === USING "StateService" Service (no references to Ngxs)
// ===========================================================================
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

// services
import { StateService } from './core/state.service';

// decorators
import { LogClassMethods } from './decorators/log.decorator';

interface LinkList {
  text: string;
  routerLink: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@LogClassMethods()
export class AppComponent implements OnDestroy {
  appName = 'Ngxs App - Demo';
  linkList: LinkList[] = [
    {
      text: `Home`,
      routerLink: 'home'
    },
    {
      text: `Lazy1`,
      routerLink: 'lazy1'
    }
  ];
  submenus: LinkList[] = [{ text: 'About', routerLink: '.' }, { text: 'Terms and Conditions', routerLink: '.' }];
  wholeStateSubscription: Subscription;

  constructor(private stateService: StateService) {
    this.wholeStateSubscription = this.stateService
      .getStateBySelector(this.stateService.selectors.wholeState)
      .subscribe(state => this.appStoreChanged(state));
  }

  ngOnDestroy() {
    this.wholeStateSubscription.unsubscribe();
  }

  private appStoreChanged(state) {}
}
