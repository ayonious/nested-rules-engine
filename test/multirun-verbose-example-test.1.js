const {executeEngine} = require('../src/nested-rules-engine');
const {expect} = require('chai');

describe('Advanced Example: Multi Execution and verbose output', () => {
    it(`is working`, function () {
        // Step1: Define your conditional rules
        // here there are 2 set of rules as array, both of them will be run on same set of rules,variables,functions
        const rules = [{
            "you_are_a_human": {
                "you_are_kind":{
                    "you_are_older_than_15": "you_must_be_something",
                    "default": "there_is_no_option"
                }
            },
            "default": "there_is_no_option"
        }, {
            "the_cup_is_not_empty": {
                "you_drank_too_much_water": "feeling_sick",
            },
            "default" : "there_is_no_option"
        }];
        
        // Step2: make set of inputs collection
        const inputs = {
            "type" : "human",
            "kindnessLevel": 0,
            "waterLevelinCup": 10,
            "waterInBelly": 10
        }
        
        // Step3: Make your custom Functions
        const functions = {
            default : () => true,
            you_are_a_human: ({type}) => type === 'human',
            you_are_kind: ({kindnessLevel}) => kindnessLevel > 300,
            the_cup_is_not_empty: ({waterLevelinCup}) => waterLevelinCup > 9,
            you_drank_too_much_water: ({waterInBelly}) => waterInBelly === 100,
            you_live_near_my_house: ({postcode}) => postcode === 12223,
            feeling_sick: () => ({
                payload: 'going home',
                effort: 'im getting sick'
            }),
            go_home_and_sleep: () => ({
                payload: 'going home',
                effort: 'im getting sleepy'
            }),
            please_do_my_homework: () => ({
                payload: 'doing homework',
                effort: 'im getting sick'
            }),
            you_must_be_something: () => ({
                payload: 'data',
                effort: 'infinity'
            }),
            there_is_no_option: () => ({
                payload: '??',
                effort: '???'
            })
        };
        
        const options = {
            verbose: true,
            multiple: true
        };

        // Step4: Execute Engine
        const res = executeEngine(inputs, functions, rules, options);

        console.log(res);
        expect(res).to.deep.equal(
            [{ 
                result: null,
                logs: { 
                    inputCheckErrors: { 
                        you_are_older_than_15: 'function Not found' 
                    } 
                } 
            },{ 
                result: { payload: 'going home', effort: 'im getting sleepy' },
                logs: [ 
                    'Executing Function the_cup_is_not_empty',
                    'Result of Function the_cup_is_not_empty is true',
                    'Executing Function you_drank_too_much_water',
                    'Result of Function you_drank_too_much_water is false',
                    'Executing Function default',
                    'Result of Function default is true',
                    'Executing Function go_home_and_sleep' ] 
            }]
        );
    }); 
});