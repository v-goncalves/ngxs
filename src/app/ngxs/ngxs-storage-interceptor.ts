// utils & decorators
import { b64EncodeUnicode, b64DecodeUnicode } from '../utils';
import { LogMethod } from '../decorators/log.decorator';

// state - default states for lazy modules
import { lazy1StoreObjectDefault } from '../lazy1/state/lazy1.state';

export const encryptStoreLocalStorage = true;
export const baseStateObjectName = '@@STATE';

const defaultStoreComposedWithAllLazyStates = {
  [lazy1StoreObjectDefault.name]: lazy1StoreObjectDefault.defaults
};

export class NgxsStorageInterceptor {
  @LogMethod()
  private static removeRouterObjectFromStateObject(state: object): object {
    if (state && state['router']) {
      const newState = { ...state };
      delete newState['router'];
      return newState;
    }
    return state;
  }

  @LogMethod()
  public static serialize(value) {
    // NOTE: "removeRouterObjectFromStateObject" is needed to avoid storing the "router" data;
    // if the route is stored, then, if we set the same route with query parameters, the the parameters are not applied
    const valueWithoutRoute = NgxsStorageInterceptor.removeRouterObjectFromStateObject(value);
    return encryptStoreLocalStorage ? b64EncodeUnicode(JSON.stringify(valueWithoutRoute)) : JSON.stringify(valueWithoutRoute);
  }

  @LogMethod()
  public static deserialize(value) {
    return {
      // NOTE: "defaultStoreComposedWithAllLazyStates" is NEEDED HERE! At least on v.3.1.4 (of Ngxs)
      // if not applied, when jumping form one route to a lazy loaded one, the default store object for the
      // lazy state is loaded, but immediately after that the "deserialize" method is called and the data in
      // the storage is applied (without) the lazy loaded state!!! (Bug from Ngxs)
      // NOTE2: to have a better understanding when debugging, please comment "NgxsRouterPluginModule.forRoot()"
      ...defaultStoreComposedWithAllLazyStates,
      ...((value && typeof value === 'string' && JSON.parse(encryptStoreLocalStorage ? b64DecodeUnicode(value) : value)) || undefined)
    };
  }
}
