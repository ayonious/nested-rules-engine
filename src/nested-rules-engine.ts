import { isGoodInputs } from './input-checker';
import { createErrorOutput, createOutput, Result } from './output-formatter';

const singleTraverse = (
  inputs: any,
  functions: any,
  tree: any,
  options: any
): Result => {
  // Check input validity
  const resCheckInputs = isGoodInputs(functions, tree);
  if (isGoodInputs(functions, tree) !== true) {
    return createErrorOutput({
      inputCheckErrors: resCheckInputs,
    });
  }

  // prepare variables for verbose inputs
  const isVerbose = options && options.verbose === true;
  const verboseOutput: string[] = [];

  const getVerbose = (text: string) => {
    if (isVerbose) {
      verboseOutput.push(text);
    }
  };

  let isResFound: boolean = false; //true when we reached the result node
  let output: any;

  const dfs = (current: any) => {
    //base case
    if (typeof current !== 'object') {
      getVerbose(`Executing Function ${current}`);
      output = createOutput(functions[current], inputs, verboseOutput);
      isResFound = true;
      return true;
    }

    for (const key in current) {
      getVerbose(`Executing Function ${key}`);
      const thisRes = functions[key](inputs);
      getVerbose(`Result of Function ${key} is ${thisRes}`);

      if (thisRes === true) {
        dfs(current[key]);
      }

      if (isResFound) {
        break;
      }
    }
  };
  dfs(tree);
  if (isResFound) {
    return output;
  }
  return createErrorOutput('Could not Hit Any Rules');
};

const multipleTraverse = (
  inputs: any,
  functions: any,
  trees: any,
  options: any
): Result[] => {
  const res: Result[] = [];
  for (const tree of trees) {
    res.push(singleTraverse(inputs, functions, tree, options));
  }
  return res;
};

export const executeEngine = (
  inputs: any,
  functions: any,
  trees: any,
  options?: any
): Result | Result[] => {
  if (options && options.multiple === true) {
    return multipleTraverse(inputs, functions, trees, options);
  } else {
    return singleTraverse(inputs, functions, trees, options);
  }
};
