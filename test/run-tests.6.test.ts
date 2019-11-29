import { executeEngine } from '../src/nested-rules-engine';
import rules from './test6/sample.json';
import { functions } from './test6/functions';
import inputs from './test6/inputs.json';

describe('Test6: Simplest Test is passing', () => {
  it(`Smallest 1 liner test`, function() {
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
