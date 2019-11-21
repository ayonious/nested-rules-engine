import {executeEngine} from '../src/nested-rules-engine';
/*

describe('Test1: Simplest parallel test should pass', () => {
    import rules from './test1/sample';
    import {functions} from './test1/functions.ts';
    import inputs from './test1/inputs';

    it(`parallel traverse should work`, function () {
        const options = {
            multiple: true,
            verbose: false
        };

        const res = executeEngine(inputs, functions, rules, options);
        expect(res).toStrictEqual([{
            result : {
                payload: 'doing homework', 
                effort: 'im getting sick' 
            },
            logs: []
        }, { 
            result : {
                getting: 'my car',
                finding: 'my phone' 
            },
            logs: []
        }]);
    });
    it(`parallel traverse should work with verbose output`, function () {
        const options = {
            multiple: true,
            verbose: true
        };
        const res = executeEngine(inputs, functions, rules, options);

        expect(res).toStrictEqual([{
            result : {
                payload: 'doing homework', 
                effort: 'im getting sick' 
            }, logs: [
                "Executing Function you_are_a_human",
                "Result of Function you_are_a_human is true",
                "Executing Function you_are_not_racist",
                "Result of Function you_are_not_racist is true",
                "Executing Function you_are_kind",
                "Result of Function you_are_kind is false",
                "Executing Function you_are_smart",
                "Result of Function you_are_smart is true",
                "Executing Function you_live_near_my_house",
                "Result of Function you_live_near_my_house is true",
                "Executing Function you_like_people",
                "Result of Function you_like_people is true",
                "Executing Function please_do_my_homework",
          ]
        }, { 
            result : {
                getting: 'my car',
                finding: 'my phone' 
            }, logs: [
                "Executing Function you_feel_good",
                "Result of Function you_feel_good is false",
                "Executing Function you_feel_shit",
                "Result of Function you_feel_shit is true",
                "Executing Function you_have_temperature",
                "Result of Function you_have_temperature is true",
                "Executing Function goto_doctor",
          ]
        }]);
    });
});

describe('Test2: Simplest serial test should pass', () => {
    const rules = require('./test2/sample');
    const functions = require('./test2/functions.js');
    const inputs = require('./test2/inputs');

    it(`serial traverse should work`, function () {
        const res = executeEngine(inputs, functions, rules);
        const serialExpectedOutput = {
            result : {
                payload: 'doing homework', 
                effort: 'im getting sick' 
            },
            logs: []
        };
        expect(res).toStrictEqual(serialExpectedOutput);
    });

    it(`serial traverse should work with verbose output`, function () {
        const options = {
            verbose: true
        };
        const res = executeEngine(inputs, functions, rules, options);
        const expectedSerialVerboseRes = {
            result : {
                payload: 'doing homework', 
                effort: 'im getting sick' 
            }, logs: [
                "Executing Function you_are_a_human",
                "Result of Function you_are_a_human is true",
                "Executing Function you_are_not_racist",
                "Result of Function you_are_not_racist is true",
                "Executing Function you_are_kind",
                "Result of Function you_are_kind is false",
                "Executing Function you_are_smart",
                "Result of Function you_are_smart is true",
                "Executing Function you_live_near_my_house",
                "Result of Function you_live_near_my_house is true",
                "Executing Function you_like_people",
                "Result of Function you_like_people is true",
                "Executing Function please_do_my_homework",
          ]
        };
        expect(res).toStrictEqual(expectedSerialVerboseRes);
    });
});


describe('Test3: Non False return functions can work', () => {
    const rules = require('./test3/sample');
    const functions = require('./test3/functions.js');
    const inputs = require('./test3/inputs');

    it(`Should have output`, function () {
        const res = executeEngine(inputs, functions, rules);
        const serialExpectedOutput = {
            result : {
                "productBought" : "alcohol"
            },
            logs: []
        };
        expect(res).toStrictEqual(serialExpectedOutput);
    });
});


describe('Basic Checks are working', () => {
    it(`Test4: Missing Functions should be caught`, function () {
        const rules = require('./test4/sample');
        const functions = require('./test4/functions.js');
        const inputs = require('./test4/inputs');
        
        
        const res = executeEngine(inputs, functions, rules);
        const serialExpectedOutput = {
            result: null,
            logs : {
                inputCheckErrors: {
                    default: "function Not found",
                    you_are_old_enough: "function Not found"
                }
            }
        };
        expect(res).toStrictEqual(serialExpectedOutput);
    });

    it(`Test5: No Final Rule Hit should be caught`, function () {
        var rules = require('./test5/sample');
        const functions = require('./test5/functions.js');
        var inputs = require('./test5/inputs');
        
        inputs.ageType = 'child'

        const res = executeEngine(inputs, functions, rules);
        const serialExpectedOutput = {
            result: null,
            logs : 'Could not Hit Any Rules'
        };
        expect(res).toStrictEqual(serialExpectedOutput);
    });
});

describe('Test6: Simplest Test is passing', () => {
    it(`Smallest 1 liner test`, function () {
        const rules = require('./test6/sample');
        const functions = require('./test6/functions.js');
        const inputs = require('./test6/inputs');
        const res = executeEngine(inputs, functions, rules);
        const serialExpectedOutput = {
            result : {
                "productBought" : "alcohol"
            },
            logs: []
        };
        expect(res).toStrictEqual(serialExpectedOutput);
    });
});

describe('Test7: Very Nested test', () => {
    it(`Should pass`, function () {
        const rules = require('./test6/sample');
        const functions = require('./test6/functions.js');
        const inputs = require('./test6/inputs');
        const res = executeEngine(inputs, functions, rules);
        const serialExpectedOutput = {
            result : {
                "productBought" : "alcohol"
            },
            logs: []
        };
        expect(res).toStrictEqual(serialExpectedOutput);
    });
});

*/