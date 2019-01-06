const isLeaf = (tree) => {
    return typeof tree !== 'object';
};

const getAllNodesOfTree = (tree) => {
    let output = [];

    const dfs = (current) => {
        if(isLeaf(current)) {
            output.push(`${current}`);
            return;
        }
        for(var key in current) {
            output.push(`${key}`);
            dfs(current[key]);
        }
    };
    dfs(tree);
    return output;
};

module.exports = {
    getAllNodesOfTree
};