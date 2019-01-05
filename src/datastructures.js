class Stack {
    constructor() {
        this.collection = [];
    }

    pop() {
        return this.collection.pop();
    }

    push(val) {
        this.collection.push(val);
    }

    last() {
        var len = this.collection.length;
        return this.collection[len - 1];
    }

    isEmpty() {
        return this.collection.length === 0;
    }
}

module.exports = {
    Stack
};