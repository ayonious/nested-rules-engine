const {executeEngine} = require('../src/nested-rules-engine');
const {expect} = require('chai');

describe('Basic Example', () => {
    it(`is working`, function () {
        // Step1: Define your conditional rules
        const rules = {
            "you_are_a_human": {
                "you_are_kind":{
                    "you_are_older_than_15": "you_must_be_something"
                },
                "you_are_smart": {
                    "you_live_near_my_house": "please_do_my_homework"
                }
            }
        };
        
        // Step2: make set of inputs collection
        const inputs = {
            "type" : "human",
            "iqLevel": 500,
            "kindnessLevel": 0,
            "postcode": 12223
        }
        
        // Step3: Make your custom Functions
        const functions = {
            you_are_a_human: ({type}) => {
                return type === 'human';
            },
            you_are_smart: ({iqLevel}) => {
                return iqLevel > 300;
            },
            you_are_kind: ({kindnessLevel}) => {
                return kindnessLevel > 300;
            },
            you_are_older_than_15: ({age}) => {
                return age > 15;
            },
            you_live_near_my_house: ({postcode}) => {
                return postcode === 12223;
            },
            please_do_my_homework: () => {
                return {
                    payload: 'doing homework',
                    effort: 'im getting sick'
                };
            },
            you_must_be_something: () => {
                return {
                    payload: 'data',
                    effort: 'infinity'
                };
            }
        };
        
        // Step4: Execute Engine
        const res = executeEngine(inputs, functions, rules);
        
        expect(res).to.deep.equal({
                result:  {
                    payload: 'doing homework',
                    effort: 'im getting sick'
                },
                logs: []
            }
        );
    }); 
});