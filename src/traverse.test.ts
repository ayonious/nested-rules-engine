import { getAllNodesOfTree } from '../src/traverse';

describe('Traverse', () => {
  it('should return an array with a single node for a leaf', () => {
    const tree = 'leaf';

    const result = getAllNodesOfTree(tree);

    expect(result).toEqual(['leaf']);
  });

  it('should return all nodes for a simple tree', () => {
    const tree = {
      a: 'b',
    };

    const result = getAllNodesOfTree(tree);

    expect(result).toContain('a');
    expect(result).toContain('b');
    expect(result.length).toBe(2);
  });

  it('should return all nodes for a nested tree', () => {
    const tree = {
      a: {
        b: 'c',
      },
    };

    const result = getAllNodesOfTree(tree);

    expect(result).toContain('a');
    expect(result).toContain('b');
    expect(result).toContain('c');
    expect(result.length).toBe(3);
  });

  it('should handle complex nested trees', () => {
    const tree = {
      a: {
        b: 'e',
        c: {
          d: 'f',
        },
      },
    };

    const result = getAllNodesOfTree(tree);

    expect(result).toEqual(
      expect.arrayContaining(['a', 'b', 'c', 'd', 'e', 'f'])
    );
    expect(result.length).toBe(6);
  });

  it('should handle trees with multiple branches at the same level', () => {
    const tree = {
      a: 'b',
      c: 'd',
      e: {
        f: 'g',
      },
    };

    const result = getAllNodesOfTree(tree);

    expect(result).toEqual(
      expect.arrayContaining(['a', 'b', 'c', 'd', 'e', 'f', 'g'])
    );
    expect(result.length).toBe(7);
  });
});
