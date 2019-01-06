const { getAllNodesOfTree } = require('./traverse');

const isGoodInputs = (functions, tree) => { 
    const all_elements = getAllNodesOfTree(tree);
    var output = {};

    //Check if function
    for(var key of all_elements) {
        if(typeof functions[key] !== 'function') {
            output[`${key}`] = 'function Not found';
        }
    }
    
    if(Object.keys(output).length === 0 && output.constructor === Object) {
        return true;
    } else {
        return output;
    }
};

module.exports = {
    isGoodInputs
};

