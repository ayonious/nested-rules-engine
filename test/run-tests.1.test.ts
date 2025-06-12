import { executeEngine } from '../src/nested-rules-engine';
import rules from './test1/sample.json';
import { functions } from './test1/functions';
import inputs from './test1/inputs.json';

describe('Test1: Simplest parallel test should pass', () => {
  it(`parallel traverse should work`, function () {
    const options = {
      multiple: true,
      verbose: false,
    };

    const res = executeEngine(inputs, functions, rules, options);
    expect(res).toStrictEqual([
      {
        result: {
          payload: 'doing homework',
          effort: 'im getting sick',
        },
        logs: [],
      },
      {
        result: {
          getting: 'my car',
          finding: 'my phone',
        },
        logs: [],
      },
    ]);
  });

  it(`parallel traverse should work with verbose output`, function () {
    const options = {
      multiple: true,
      verbose: true,
    };
    const res = executeEngine(inputs, functions, rules, options);

    expect(res).toStrictEqual([
      {
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
      },
      {
        result: {
          getting: 'my car',
          finding: 'my phone',
        },
        logs: [
          'Executing Function you_feel_good',
          'Result of Function you_feel_good is false',
          'Executing Function you_feel_shit',
          'Result of Function you_feel_shit is true',
          'Executing Function you_have_temperature',
          'Result of Function you_have_temperature is true',
          'Executing Function goto_doctor',
        ],
      },
    ]);
  });
});
