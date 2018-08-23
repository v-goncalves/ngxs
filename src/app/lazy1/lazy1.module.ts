import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';

// components
import { LazyComponent } from './lazy-component/lazy.component';

// modules
import { JsonViewModule } from '../shared/json-view/json-view.module';
import { angularMaterialModulesForLazy1 } from './lazy1-material-modules';

// state
import { Lazy1State } from './state/lazy1.state';

const Lazy1ModuleRoutes: Routes = [
  {
    path: '',
    component: LazyComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forFeature([Lazy1State]),
    RouterModule.forChild(Lazy1ModuleRoutes),
    ...angularMaterialModulesForLazy1,
    JsonViewModule
  ],
  declarations: [LazyComponent]
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Lazy1Module {}
