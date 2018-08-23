import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

interface RouteList {
  [key: string]: {
    id: string;
    path: string;
  };
}

const routesList: RouteList = {
  home: {
    id: 'home',
    path: 'home'
  },
  lazy1: {
    id: 'lazy1',
    path: 'lazy1'
  }
};

const routes: Routes = [
  {
    path: routesList.home.path,
    component: HomeComponent,
    data: routesList.home
  },
  {
    path: routesList.lazy1.path,
    loadChildren: './lazy1/lazy1.module#Lazy1Module',
    data: routesList.lazy1
  },
  {
    path: '**',
    redirectTo: routesList.home.path
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // enableTracing: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
