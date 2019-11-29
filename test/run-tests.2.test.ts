import { executeEngine } from '../src/nested-rules-engine';
import rules from './test2/sample.json';
import { functions } from './test2/functions';
import inputs from './test2/inputs.json';

describe('Test2: Simplest serial test should pass', () => {
  it(`serial traverse should work`, function() {
    const res = executeEngine(inputs, functions, rules);
    const serialExpectedOutput = {
      result: {
        payload: 'doing homework',
        effort: 'im getting sick',
      },
      logs: [],
    };
    expect(res).toStrictEqual(serialExpectedOutput);
  });

  it(`serial traverse should work with verbose output`, function() {
    const options = {
      verbose: true,
    };
    const res = executeEngine(inputs, functions, rules, options);
    const expectedSerialVerboseRes = {
      result: {
        payload: 'doing homework',
        effort: 'im getting sick',
      },
      logs: [
        'Executing Function you_are_a_human',
        'Result of Function you_are_a_human is true',
        'Executing Function you_are_not_racist',
        'Result of Function you_are_not_racist is true',
        'Executing Function you_are_kind',
        'Result of Function you_are_kind is false',
        'Executing Function you_are_smart',
        'Result of Function you_are_smart is true',
        'Executing Function you_live_near_my_house',
        'Result of Function you_live_near_my_house is true',
        'Executing Function you_like_people',
        'Result of Function you_like_people is true',
        'Executing Function please_do_my_homework',
      ],
    };
    expect(res).toStrictEqual(expectedSerialVerboseRes);
  });
});
