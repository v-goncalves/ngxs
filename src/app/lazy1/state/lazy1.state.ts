import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Lazy1SateModel } from './lazy1.model';
import { AddLazy1ContentState } from './lazy1.actions';

export const lazy1StoreObjectName = 'lazy1';
export const lazy1StoreObjectDefault = {
  name: lazy1StoreObjectName,
  defaults: {
    content: 'lazy1_initial_value'
  }
};
@State<Lazy1SateModel>(lazy1StoreObjectDefault)
export class Lazy1State {
  @Selector()
  static getProp(prop) {
    return (state: { [lazy1StoreObjectName]: Lazy1SateModel }) => state && state[lazy1StoreObjectName] && state[lazy1StoreObjectName][prop];
  }

  @Action(AddLazy1ContentState)
  addState(ctx: StateContext<Lazy1SateModel>, action: AddLazy1ContentState) {
    ctx.patchState({
      // ...lazy1StoreObjectDefault.defaults,
      // ...ctx.getState(),
      content: action.payload.content
    });
  }
}
