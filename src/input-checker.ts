import { getAllNodesOfTree } from './traverse';

export const isGoodInputs = (functions: any, tree: any) => {
  const all_elements: string[] = getAllNodesOfTree(tree);
  const output: any = {};

  //Check if function
  for (const key of all_elements) {
    if (typeof functions[key] !== 'function') {
      output[`${key}`] = 'function Not found';
    }
  }

  if (Object.keys(output).length === 0 && output.constructor === Object) {
    return true;
  } else {
    return output;
  }
};
