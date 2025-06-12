import { executeEngine } from '../src/nested-rules-engine';
import rules from './test3/sample.json';
import { functions } from './test3/functions';
import inputs from './test3/inputs.json';

describe('Test3: Non False return functions can work', () => {
  it(`Should have output`, function () {
    const res = executeEngine(inputs, functions, rules);
    const serialExpectedOutput = {
      result: {
        productBought: 'alcohol',
      },
      logs: [],
    };
    expect(res).toStrictEqual(serialExpectedOutput);
  });
});
