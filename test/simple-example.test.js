const {executeEngine} = require('../src/nested-rules-engine');

describe('Simple Example', () => {
    it(`is working`, function () {
        
        // Step1: Define your conditional rules
        const rules = {
            "you_are_a_human": {
                "you_are_kind": "help_me_find_my_book",
                "you_are_smart": "please_do_my_homework",
            },
            "default": "please_do_my_homework"
        };
        
        // Step2: make set of inputs collection
        const inputs = {
            "type" : "human",
            "kindnessLevel": 0,
            "intelligence": 10
        }
        
        // Step3: Make your custom Functions
        const functions = {
            default : () => true,
            you_are_a_human: ({type}) => type === 'human',
            you_are_kind: ({kindnessLevel}) => kindnessLevel > 300,
            you_are_smart: ({intelligence}) => intelligence > 5,
            help_me_find_my_book: () => ({
                payload: 'lets help someone',
                effort: 'finding the book'
            }),
            please_do_my_homework: () => ({
                payload: 'doing homework',
                effort: 'im getting sick'
            })
        };

        // Step4: Execute Engine
        const res = executeEngine(inputs, functions, rules);
        
        expect(res).toStrictEqual({ 
            result: {
                payload: 'doing homework',
                effort: 'im getting sick'
            },
            logs: []
        });
    }); 
});