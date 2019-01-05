const Stack = require('./Stack');

const getAllNodesOfTree = (tree) => {
    let stack = new Stack();
    stack.push(tree)
    let output = [];

    while ( stack.empty() ) {
        var current = stack.pop();
        //element is a leaf
        if(typeof current !== 'object') {
            output.push(`${current}`);
            continue;
        }
        
        //element is a branch
        for(var key in current) {
            const nextCur = current[key];
            output.push(`${key}`);
            stack.push(nextCur);
        }
    }
    return output;
};

module.exports = {
    getAllNodesOfTree
};