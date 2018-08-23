import { JsonViewModule } from './json-view.module';

describe('JsonViewModule', () => {
  let jsonViewModule: JsonViewModule;

  beforeEach(() => {
    jsonViewModule = new JsonViewModule();
  });

  it('should create an instance', () => {
    expect(jsonViewModule).toBeTruthy();
  });
});
