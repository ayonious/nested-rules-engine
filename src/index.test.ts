import { executeEngine } from './index';
import { executeEngine as originalEngine } from './nested-rules-engine';
import { Result } from './output-formatter';
import * as indexModule from './index';

describe('Index Module', () => {
  describe('Named Export', () => {
    it('should export executeEngine function', () => {
      expect(typeof executeEngine).toBe('function');
    });

    it('should be the same function as from nested-rules-engine', () => {
      expect(executeEngine).toBe(originalEngine);
    });
  });

  describe('Module Structure', () => {
    it('should have executeEngine as a named export', () => {
      expect(indexModule).toHaveProperty('executeEngine');
      expect(typeof indexModule.executeEngine).toBe('function');
    });

    it('should only export executeEngine', () => {
      const exportedKeys = Object.keys(indexModule);
      expect(exportedKeys).toEqual(['executeEngine']);
    });
  });

  describe('Functional Test', () => {
    it('should work when imported from index', () => {
      const rules = {
        condition: 'action',
      };

      const inputs = { value: 10 };

      const functions = {
        condition: () => true,
        action: () => 'success from index',
      };

      const result = executeEngine(inputs, functions, rules);

      expect(result).toEqual({
        result: 'success from index',
        logs: [],
      });
    });

    it('should handle error cases when imported from index', () => {
      const rules = {
        missing_function: 'action',
      };

      const inputs = { value: 10 };

      const functions = {
        action: () => 'should not reach here',
      };

      const result = executeEngine(inputs, functions, rules);

      expect(result).toHaveProperty('result', null);
      expect(result).toHaveProperty(
        'logs.inputCheckErrors.missing_function',
        'function Not found'
      );
    });

    it('should handle verbose mode when imported from index', () => {
      const rules = {
        condition: 'action',
      };

      const inputs = { value: 10 };

      const functions = {
        condition: () => true,
        action: () => 'verbose test',
      };

      const options = { verbose: true };

      const result = executeEngine(inputs, functions, rules, options) as Result;

      expect(result).toHaveProperty('result', 'verbose test');
      expect(result).toHaveProperty('logs');
      expect(Array.isArray(result.logs)).toBe(true);
      expect(result.logs.length).toBeGreaterThan(0);
    });

    it('should handle multiple execution mode when imported from index', () => {
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
