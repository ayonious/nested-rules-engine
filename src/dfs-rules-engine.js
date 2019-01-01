const {isGoodInputs} = require('./input-checker');
const {createErrorOutput, createOutput} = require('./output-formatter');

const serialTraverse = (inputs, functions, tree, options) => {
    // Check input validity
    const resCheckInputs = isGoodInputs(functions, tree);
    if (resCheckInputs !== true) {
        return createErrorOutput({
            inputCheckErrors: resCheckInputs
        });
    }
    
    let current = tree;
    let isVerbose = options && options.verbose === true;
    let verboseOutput = [];

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
        var isFound = false;
        for(var key in current) {
            getVerbose(`Executing Function ${key}`);
            const thisRes = functions[key](inputs);
            getVerbose(`Result of Function ${key} is ${thisRes}`);
            if( thisRes === true ) {
                current = current[key];
                isFound = true;
                break;
            }
        }
        if(!isFound) {
            break;
        }
	}
	return createErrorOutput('Could not Hit Any Rules');
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