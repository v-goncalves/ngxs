import { Lazy1Module } from './lazy1.module';

describe('Lazy1Module', () => {
  let lazy1Module: Lazy1Module;

  beforeEach(() => {
    lazy1Module = new Lazy1Module();
  });

  it('should create an instance', () => {
    expect(lazy1Module).toBeTruthy();
  });
});
