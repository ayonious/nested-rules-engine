import { createOutput, createErrorOutput } from './output-formatter';

describe('Output Formatter', () => {
  describe('createOutput', () => {
    it('should create a result object with the function execution result', () => {
      const executable = (inputs: any) => `Result: ${inputs.value}`;
      const inputs = { value: 'test' };
      const verboseOutput = ['log1', 'log2'];

      const result = createOutput(executable, inputs, verboseOutput);

      expect(result).toEqual({
        result: 'Result: test',
        logs: ['log1', 'log2'],
      });
    });

    it('should handle complex return values from the executable', () => {
      const executable = () => ({ data: 'complex', nested: { value: true } });
      const inputs = {};
      const verboseOutput = [];

      const result = createOutput(executable, inputs, verboseOutput);

      expect(result).toEqual({
        result: { data: 'complex', nested: { value: true } },
        logs: [],
      });
    });

    it('should pass the inputs to the executable function', () => {
      const mockFn = jest.fn().mockReturnValue('result');
      const inputs = { key: 'value' };

      createOutput(mockFn, inputs, []);

      expect(mockFn).toHaveBeenCalledWith(inputs);
    });
  });

  describe('createErrorOutput', () => {
    it('should create an error result with null result and error logs', () => {
      const errorLogs = 'Something went wrong';

      const result = createErrorOutput(errorLogs);

      expect(result).toEqual({
        result: null,
        logs: 'Something went wrong',
      });
    });

    it('should handle object error logs', () => {
      const errorLogs = { error: 'Invalid input', code: 400 };

      const result = createErrorOutput(errorLogs);

      expect(result).toEqual({
        result: null,
        logs: { error: 'Invalid input', code: 400 },
      });
    });

    it('should handle array error logs', () => {
      const errorLogs = ['Error 1', 'Error 2'];

      const result = createErrorOutput(errorLogs);

      expect(result).toEqual({
        result: null,
        logs: ['Error 1', 'Error 2'],
      });
    });
  });
});
