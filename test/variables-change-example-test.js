const {executeEngine} = require('../src/nested-rules-engine');
const {expect} = require('chai');

describe('Advanced Example: Variable Change while Engine Execution', () => {
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
                "drink_water_a_little":{ }, // these functions execute but dont return results
                "drink_water_a_little":{ },
                "drink_water_a_little":{ },
                "the_cup_is_empty": {
                    "you_drank_too_much_water": "feeling_sick",
                    "default": "go_home_and_sleep"
                }
            },
            "default" : "there_is_no_option"
        }];
        
        // Step2: make set of inputs collection
        const inputs = {
            "type" : "human",
            "kindnessLevel": 0,
            "waterLevelinCup": 10
        }
        
        // Step3: Make your custom Functions
        const functions = {
            default : () => true,
            you_are_a_human: ({type}) => type === 'human',
            you_are_kind: ({kindnessLevel}) => kindnessLevel > 300,
            the_cup_is_not_empty: ({waterLevelinCup}) => waterLevelinCup > 9,
            the_cup_is_empty: ({waterLevelinCup}) => waterLevelinCup === 0,
            drink_water_a_little: (variables) => {
                variables.waterLevelinCup = Math.max( 0, variables.waterLevelinCup - 1);
                return false; //must return false for functions that changes/adds/deletes variables
            },
            you_drank_too_much_water: ({waterLevelinCup}) => waterLevelinCup === -1,
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
            
        };
        // Step4: Execute Engine
        // const res = executeEngine(inputs, functions, rules);
        /*
        expect(res).to.deep.equal({
                result:  {
                    payload: 'doing homework',
                    effort: 'im getting sick'
                },
                logs: []
            }
        );*/
    }); 
});