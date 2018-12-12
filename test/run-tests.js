const {parallelTraverse} = require('../src/dfs-rules-engine');
const {expect} = require('chai');
const rules = require('./test1/sample');
const functions = require('./test1/functions.js');
const inputs = require('./test1/inputs');


describe('Simplest test should pass', () => {
    it(`test1`, function () {
        const res = parallelTraverse(inputs, functions, rules);
        expect(res).to.deep.equal([{
            payload: 'doing homework', 
            effort: 'im getting sick' 
        }, { 
            getting: 'my car',
            finding: 'my phone' 
        }]);
    });
});
