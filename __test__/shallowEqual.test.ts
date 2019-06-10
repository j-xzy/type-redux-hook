import { shallowEqual } from '../src/util';

describe('shallowEqual', () => {

  it('origin', () => {
    expect(shallowEqual(1, 1)).toBe(true);
    expect(shallowEqual(1, 2)).toBe(false);

    expect(shallowEqual(0, 0)).toBe(true);
    expect(shallowEqual(0, 1)).toBe(false);

    expect(shallowEqual(NaN, NaN)).toBe(true);
    expect(shallowEqual(NaN, 1)).toBe(false);

    expect(shallowEqual(true, true)).toBe(true);
    expect(shallowEqual(true, false)).toBe(false);

    expect(shallowEqual('1', '1')).toBe(true);
    expect(shallowEqual('1', '2')).toBe(false);
  });

  it('array', () => {
    expect(shallowEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(shallowEqual([3, 3, 3], [1, 2, 3])).toBe(false);
    expect(shallowEqual([3, 3, 3], [1, 2])).toBe(false);
  });

  it('object', () => {
    expect(shallowEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
    expect(shallowEqual({ a: 1, b: 2 }, { a: 2, b: 2 })).toBe(false);
    expect(shallowEqual({ a: 1, b: 2 }, { a: 1 })).toBe(false);
  });
});
