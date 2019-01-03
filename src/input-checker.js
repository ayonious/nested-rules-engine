const bfs = (tree) => {
    let queue = [tree];
    let output = [];

    while ( queue.length > 0 ) {
        var current = queue.pop();   
        if(typeof current !== 'object') {
            output.push(`${current}`);
            continue;
        }
        for(var key in current) {
            const nextCur = current[key];
            output.push(`${key}`);
            queue.push(nextCur);
        }
    }
    return output;
};

const isGoodInputs = (functions, tree) => { 
    const all_elements = bfs(tree);
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