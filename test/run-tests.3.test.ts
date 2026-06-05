import { executeEngine } from '../src/nested-rules-engine.js';
import rules from './test3/sample.json' with { type: 'json' };
import { functions } from './test3/functions.js';
import inputs from './test3/inputs.json' with { type: 'json' };

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
