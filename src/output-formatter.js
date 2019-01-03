const createReturnDto = (result, logs) => {
    return {
        result: result,
        logs: logs
    };
};

const createOutput = (executable, inputs, verboseOutput) => {
    return createReturnDto(executable(inputs), verboseOutput);
};

const createErrorOutput = (errorLogs) => {
    return createReturnDto(null, errorLogs);
};

module.exports = {
    createOutput,
    createErrorOutput
};