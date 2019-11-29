import { executeEngine } from '../src/nested-rules-engine';

describe('Advanced Example: Change variables while engine Execution', () => {
  it(`is working`, function() {
    // Step1: Define your conditional rules
    const rules = {
      the_cup_is_not_empty: {
        drink_water: {},
        you_drank_too_much_water: 'feeling_sick',
      },
      default: 'there_is_no_option',
    };

    // Step2: make set of inputs collection
    const inputs = {
      waterLevelinCup: 10,
      waterInBelly: 10,
    };

    // Step3: Make your custom Functions
    const functions = {
      default: () => true,
      the_cup_is_not_empty: ({ waterLevelinCup }) => waterLevelinCup > 9,
      you_drank_too_much_water: ({ waterInBelly }) => waterInBelly > 13,
      you_live_near_my_house: ({ postcode }) => postcode === 12223,
      feeling_sick: ({ waterInBelly }) => ({
        payload: 'going home',
        effort: `im getting sick because I drank in total ${waterInBelly} glasses of water`,
      }),
      drink_water: inputs => {
        inputs.waterLevelinCup = Math.max(0, inputs.waterLevelinCup - 5);
        inputs.waterInBelly += 5;
        return false; // always return false for functions that change the main input variables
      },
      there_is_no_option: () => ({
        payload: '??',
        effort: '???',
      }),
    };

    const options = {
      verbose: true,
      multiple: false,
    };

    // Step4: Execute Engine
    const res = executeEngine(inputs, functions, rules, options);
    expect(res).toStrictEqual({
      result: {
        payload: 'going home',
        effort: 'im getting sick because I drank in total 15 glasses of water',
      },
      logs: [
        'Executing Function the_cup_is_not_empty',
        'Result of Function the_cup_is_not_empty is true',
        'Executing Function drink_water',
        'Result of Function drink_water is false',
        'Executing Function you_drank_too_much_water',
        'Result of Function you_drank_too_much_water is true',
        'Executing Function feeling_sick',
      ],
    });
  });
});
