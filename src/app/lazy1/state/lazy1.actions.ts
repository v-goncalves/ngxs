import { Lazy1SateModel } from './lazy1.model';

export class AddLazy1ContentState {
  static readonly type = '[Lazy1State] Add Content';
  constructor(public payload: Lazy1SateModel) {}
}
