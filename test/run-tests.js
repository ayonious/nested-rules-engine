const {executeEngine} = require('../src/dfs-rules-engine');
const {expect} = require('chai');


describe('Simplest parallel test should pass', () => {
    const rules = require('./test1/sample');
    const functions = require('./test1/functions.js');
    const inputs = require('./test1/inputs');

    it(`parallel traverse should work`, function () {
        const options = {
            isParallel: true,
            verbose: false
        };

        const res = executeEngine(inputs, functions, rules, options);
        expect(res).to.deep.equal([{
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
            isParallel: true,
            verbose: true
        };
        const res = executeEngine(inputs, functions, rules, options);

        expect(res).to.deep.equal([{
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



describe('Simplest serial test should pass', () => {
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
        expect(res).to.deep.equal(serialExpectedOutput);
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
        expect(res).to.deep.equal(expectedSerialVerboseRes);
    });
});
