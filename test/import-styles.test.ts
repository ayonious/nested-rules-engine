import { executeEngine } from '../dist/index';
import * as nestedRulesEngine from '../dist/index';

describe('Import Styles', () => {
  const testRules = {
    condition: 'action',
  };

  const testInputs = { value: 10 };

  const testFunctions = {
    condition: () => true,
    action: () => 'success',
  };

  it('should work with named import', () => {
    const result = executeEngine(testInputs, testFunctions, testRules);

    expect(result).toEqual({
      result: 'success',
      logs: [],
    });
  });

  it('should work with namespace import', () => {
    const result = nestedRulesEngine.executeEngine(
      testInputs,
      testFunctions,
      testRules
    );

    expect(result).toEqual({
      result: 'success',
      logs: [],
    });
  });

  it('should have executeEngine available in namespace import', () => {
    expect(typeof nestedRulesEngine.executeEngine).toBe('function');
  });
});
