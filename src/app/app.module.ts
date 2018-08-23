import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// component
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

// modules
import { angularMaterialModules } from './app-material-modules';
import { AppRoutingModule } from './app-routing.module';
import { JsonViewModule } from './shared/json-view/json-view.module';
import { ngxsModules } from './ngxs/ngxs-modules';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [BrowserModule, BrowserAnimationsModule, ...angularMaterialModules, AppRoutingModule, ...ngxsModules, JsonViewModule],
  exports: [...angularMaterialModules],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
