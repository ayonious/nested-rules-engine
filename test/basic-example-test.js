const {executeEngine} = require('../src/nested-rules-engine');
const {expect} = require('chai');

describe('Basic Example', () => {
    it(`is working`, function () {
        // Step1: Define your conditional rules
        const rules = {
            "you_are_a_human": {
                "you_are_kind": "you_must_be_something",
                "you_are_smart": "please_do_my_homework"
            }
        };
        
        // Step2: make set of inputs collection
        const inputs = {
            "type" : "human",
            "iqLevel": 500,
            "kindnessLevel": 0
        }
        
        // Step3: Make your custom Functions
        const functions = {
            you_are_a_human: ({type}) =>  type === 'human',
            you_are_smart: ({iqLevel}) => iqLevel > 300,
            you_are_kind: ({kindnessLevel}) => kindnessLevel > 300,
            please_do_my_homework: () => ({ payload: 'doing homework', effort: 'im getting sick'}),
            you_must_be_something: () => ({ payload: 'data', effort: 'infinity'})
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