import { executeEngine } from '../src/nested-rules-engine';
import rules from './test7/sample.json';
import { functions } from './test7/functions';
import inputs from './test7/inputs.json';

describe('Test7: Very Nested test', () => {
  it(`Should pass`, function () {
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
