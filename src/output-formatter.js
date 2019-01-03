const createOutput = (executable, inputs, verboseOutput) => {
    return {
        result: executable(inputs),
        logs: verboseOutput
    };
};

const createErrorOutput = (errorLogs) => {
    return {
        result: null,
        logs: errorLogs
    };
};

module.exports = {
    createOutput,
    createErrorOutput
};