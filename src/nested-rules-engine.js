const {isGoodInputs} = require('./input-checker');
const {createErrorOutput, createOutput} = require('./output-formatter');
const singleTraverse = (inputs, functions, tree, options) => {
    // Check input validity
    var resCheckInputs = isGoodInputs(functions, tree);
    if (isGoodInputs(functions, tree) !== true) {
        return createErrorOutput({
            inputCheckErrors: resCheckInputs
        });
    }

    // prepare variables for verbose inputs
    let isVerbose = options && options.verbose === true;
    let verboseOutput = [];
    
    const getVerbose = ( text ) => {
        if(isVerbose) { 
            verboseOutput.push( text );
        }
    };

    var isResFound = false; //true when we reached the result node
    var output;

    const dfs = (current) => {
        //base case
        if(typeof current !== 'object') {
            getVerbose( `Executing Function ${current}`);
            output = createOutput(functions[current], inputs, verboseOutput);
            isResFound = true;
            return true;
        }

        for(var key in current) {
            
            getVerbose(`Executing Function ${key}`);
            const thisRes = functions[key](inputs);
            getVerbose(`Result of Function ${key} is ${thisRes}`);
            
            if( thisRes === true ) {
                dfs(current[key]);
            }

            if(isResFound) {
                break;
            }
        }
    };
    dfs(tree);
    if(isResFound) {
        return output;
    }
    return createErrorOutput('Could not Hit Any Rules');
};
const multipleTraverse =  (inputs, functions, trees, options) => {
    let res = [];
    for (let tree of trees) {
        res.push(singleTraverse(inputs, functions, tree, options));
    }
    return res;
};
const executeEngine =  (inputs, functions, trees, options) => {
    if(options && options.multiple === true) {
        return multipleTraverse(inputs, functions, trees, options);
    } else {
        return singleTraverse(inputs, functions, trees, options);
    }
};
module.exports = {
    executeEngine
};