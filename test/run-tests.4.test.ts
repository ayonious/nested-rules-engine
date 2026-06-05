import { executeEngine } from '../src/nested-rules-engine.js';
import rules from './test4/sample.json' with { type: 'json' };
import { functions } from './test4/functions.js';
import inputs from './test4/inputs.json' with { type: 'json' };

describe('Basic Checks are working', () => {
  it(`Test4: Missing Functions should be caught`, function () {
    const res = executeEngine(inputs, functions, rules);
    const serialExpectedOutput = {
      result: null,
      logs: {
        inputCheckErrors: {
          default: 'function Not found',
          you_are_old_enough: 'function Not found',
        },
      },
    };
    expect(res).toStrictEqual(serialExpectedOutput);
  });
});
