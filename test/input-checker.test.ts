import { isGoodInputs } from '../src/input-checker';

describe('Input Checker', () => {
  it('should return true when all functions are defined', () => {
    const functions = {
      funcA: () => true,
      funcB: () => false,
      funcC: () => 'result',
    };

    const tree = {
      funcA: {
        funcB: 'funcC',
      },
    };

    expect(isGoodInputs(functions, tree)).toBe(true);
  });

  it('should return an object with errors when functions are missing', () => {
    const functions = {
      funcA: () => true,
      // funcB is missing
      funcC: () => 'result',
    };

    const tree = {
      funcA: {
        funcB: 'funcC',
      },
    };

    const result = isGoodInputs(functions, tree);
    expect(result).not.toBe(true);
    expect(result).toHaveProperty('funcB', 'function Not found');
  });

  it('should handle leaf nodes in the tree', () => {
    const functions = {
      leaf: () => 'result',
    };

    const tree = 'leaf';

    expect(isGoodInputs(functions, tree)).toBe(true);
  });

  it('should handle complex nested trees', () => {
    const functions = {
      a: () => true,
      b: () => false,
      c: () => true,
      d: () => false,
      e: () => 'result',
      f: () => 'another result',
    };

    const tree = {
      a: {
        b: 'e',
        c: {
          d: 'f',
        },
      },
    };

    expect(isGoodInputs(functions, tree)).toBe(true);
  });
});
