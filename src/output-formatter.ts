export type Result = {
    result: any,
    logs: any,
}

const createReturnDto = (result: any, logs: any): Result => {
    return {
        result: result,
        logs: logs
    };
};

export const createOutput = (executable: any, inputs: any, verboseOutput: any): Result => {
    return createReturnDto(executable(inputs), verboseOutput);
};

export const createErrorOutput = (errorLogs: any): Result => {
    return createReturnDto(null, errorLogs);
};
