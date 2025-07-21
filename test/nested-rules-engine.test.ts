import { executeEngine } from '../src/nested-rules-engine';
import { Result } from '../src/output-formatter';

describe('Nested Rules Engine', () => {
  describe('Single Traverse', () => {
    it('should execute a simple rule tree', () => {
      const rules = {
        condition1: {
          condition2: 'action1',
        },
        default: 'action2',
      };

      const inputs = { value: 10 };

      const functions = {
        condition1: () => true,
        condition2: () => true,
        action1: () => 'result1',
        action2: () => 'result2',
        default: () => true,
      };

      const result = executeEngine(inputs, functions, rules);

      expect(result).toEqual({
        result: 'result1',
        logs: [],
      });
    });

    it('should follow the default path when conditions are not met', () => {
      const rules = {
        condition1: {
          condition2: 'action1',
        },
        default: 'action2',
      };

      const inputs = { value: 5 };

      const functions = {
        condition1: () => false,
        condition2: () => true,
        action1: () => 'result1',
        action2: () => 'result2',
        default: () => true,
      };

      const result = executeEngine(inputs, functions, rules);

      expect(result).toEqual({
        result: 'result2',
        logs: [],
      });
    });

    it('should return error when functions are missing', () => {
      const rules = {
        condition1: {
          condition2: 'action1',
        },
      };

      const inputs = { value: 10 };

      const functions = {
        condition1: () => true,
        // condition2 is missing
        action1: () => 'result1',
      };

      const result = executeEngine(inputs, functions, rules);

      expect(result).toHaveProperty('result', null);
      expect(result).toHaveProperty(
        'logs.inputCheckErrors.condition2',
        'function Not found'
      );
    });

    it('should handle verbose option', () => {
      const rules = {
        condition1: 'action1',
      };

      const inputs = { value: 10 };

      const functions = {
        condition1: () => true,
        action1: () => 'result1',
      };

      const options = { verbose: true };

      const result = executeEngine(inputs, functions, rules, options) as Result;

      expect(result).toHaveProperty('result', 'result1');
      expect(result).toHaveProperty('logs');
      expect(Array.isArray(result.logs)).toBe(true);
      expect(result.logs.length).toBeGreaterThan(0);
    });
  });

  describe('Multiple Traverse', () => {
    it('should execute multiple rule trees', () => {
      const rules = [
        {
          condition1: 'action1',
        },
        {
          condition2: 'action2',
        },
      ];

      const inputs = { value: 10 };

      const functions = {
        condition1: () => true,
        condition2: () => true,
        action1: () => 'result1',
        action2: () => 'result2',
      };

      const options = { multiple: true };

      const result = executeEngine(
        inputs,
        functions,
        rules,
        options
      ) as Result[];

      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        result: 'result1',
        logs: [],
      });
      expect(result[1]).toEqual({
        result: 'result2',
        logs: [],
      });
    });
  });
});
