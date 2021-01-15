import { myFunction } from './index.js';

describe('myFunction', () => {
  it('should be a function', () => {
    expect(typeof myFunction).toBe('function');
  });
});
