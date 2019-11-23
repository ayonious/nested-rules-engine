import {executeEngine} from '../src/nested-rules-engine';
import rules from './test5/sample.json';
import {functions} from './test5/functions';
import inputs from './test5/inputs.json';

describe('Basic Checks are working', () => {
    it(`Test5: No Final Rule Hit should be caught`, function () {
        inputs.ageType = 'child'

        const res = executeEngine(inputs, functions, rules);
        const serialExpectedOutput = {
            result: null,
            logs : 'Could not Hit Any Rules'
        };
        expect(res).toStrictEqual(serialExpectedOutput);
    });
});