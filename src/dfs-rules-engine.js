const serialTraverse = (inputs, functions, tree, options) => {
    let current = tree;
    let isVerbose = options && options.verbose === true;
    let verboseOutput = [];

    const createOutput = (executable, inputs, verboseOutput) => {
        return {
            result: executable(inputs),
            logs: verboseOutput
        };
    };

    const getVerbose = ( text ) => {
        if(isVerbose) { 
            verboseOutput.push( text );
        }
    }

    while(true) {
        if (current === null) {
            break;
        }
            
        //base case
        if(typeof current !== 'object') {
            getVerbose( `Executing Function ${current}`);
            return createOutput(functions[current], inputs, verboseOutput);
        }
        //todo check for empty object
        for(var key in current) {
            getVerbose(`Executing Function ${key}`);
            const thisRes = functions[key](inputs);
            getVerbose(`Result of Function ${key} is ${thisRes}`);
            if( thisRes === true ) {
                current = current[key];
                break;
            }
        }
	}
	return null;
};

const parallelTraverse =  (inputs, functions, trees, options) => {
    res = [];
    for (let tree of trees) {
        res.push(serialTraverse(inputs, functions, tree, options));
    }
    return res;
};


const executeEngine =  (inputs, functions, trees, options) => {
    if(options && options.isParallel === true) {
        return parallelTraverse(inputs, functions, trees, options);
    } else {
        return serialTraverse(inputs, functions, trees, options);
    }
};

module.exports = {
    executeEngine
};