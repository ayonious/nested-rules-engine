const isLeaf = (tree: any) => {
  return typeof tree !== 'object';
};

export const getAllNodesOfTree = (tree: any): string[] => {
  let output: string[] = [];

  const dfs = (current: any) => {
    if (isLeaf(current)) {
      output.push(`${current}`);
      return;
    }
    for (var key in current) {
      output.push(`${key}`);
      dfs(current[key]);
    }
  };
  dfs(tree);
  return output;
};
