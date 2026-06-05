import { executeEngine } from '../src/nested-rules-engine.js';
import rules from './test7/sample.json' with { type: 'json' };
import { functions } from './test7/functions.js';
import inputs from './test7/inputs.json' with { type: 'json' };

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
