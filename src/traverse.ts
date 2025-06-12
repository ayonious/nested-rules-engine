const isLeaf = (tree: any) => {
  return typeof tree !== 'object';
};

export const getAllNodesOfTree = (tree: any): string[] => {
  const output: string[] = [];

  const dfs = (current: any) => {
    if (isLeaf(current)) {
      output.push(`${current}`);
      return;
    }
    for (const key in current) {
      output.push(`${key}`);
      dfs(current[key]);
    }
  };
  dfs(tree);
  return output;
};
