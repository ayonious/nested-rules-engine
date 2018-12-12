const serialTraverse = (inputs, functions, tree) => {
    let current = tree;
    while(true) {
        if (current === null) {
            break;
        }
        //base case
        if(typeof current !== 'object') {
            return functions[current](inputs);
        }
        //todo check for empty object
        for(var key in current) {
            const thisRes = functions[key](inputs);
            if( thisRes === true ) {
                current = current[key];
                break;
            }
        }
	}
	return null;
};

const parallelTraverse =  (inputs, functions, trees) => {
    res = [];
    for (let tree of trees) {
        res.push(serialTraverse(inputs, functions, tree));
    }
    return res;
};

module.exports = {
    serialTraverse: serialTraverse,
    parallelTraverse: parallelTraverse
};

