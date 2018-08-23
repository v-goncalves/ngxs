import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

// configurations
import { AppConfigurationState } from '../shared/state/app.state';
import { environment } from '../../environments/environment';

// LocalStorage: serialize & deserialize
import { NgxsStorageInterceptor, baseStateObjectName } from './ngxs-storage-interceptor';

const ngxsDevModules = environment.production ? [] : [NgxsReduxDevtoolsPluginModule.forRoot()];
export const ngxsModules = [
  NgxsModule.forRoot([AppConfigurationState]),
  NgxsRouterPluginModule.forRoot(),
  NgxsStoragePluginModule.forRoot({
    key: baseStateObjectName,
    // NOTE: this is needed to avoid storing the route (saving the route may cause some problems);
    serialize: NgxsStorageInterceptor.serialize,
    deserialize: NgxsStorageInterceptor.deserialize
  }),
  ...ngxsDevModules
];
