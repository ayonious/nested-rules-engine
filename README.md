# Conditionally Nested Rules Engine

[![Build Status](https://travis-ci.org/ayonious/nested-rules-engine.svg?branch=master)](https://travis-ci.org/ayonious/nested-rules-engine)
[![npm version](https://badge.fury.io/js/nested-rules-engine.svg)](https://badge.fury.io/js/nested-rules-engine)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fayonious%2Fnested-rules-engine.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fayonious%2Fnested-rules-engine?ref=badge_shield)
[![dependencies Status](https://david-dm.org/ayonious/nested-rules-engine/status.svg)](https://david-dm.org/ayonious/nested-rules-engine)
[![devDependencies Status](https://david-dm.org/ayonious/nested-rules-engine/dev-status.svg)](https://david-dm.org/ayonious/nested-rules-engine?type=dev)

## Synopsis
A simple Decision tree based Rule Engine described using json files. Rules are executed according to decision tree. Create a set of rules (make them nested as you like) and based on set of inputs run the rules.

## Features
1. Rules expressed in huaman readable JSON
2. Create new set of inputs or change existing inputs as you traverse rules tree
3. Do multiple executions or rules set

## Installation
```
npm install nested-rules-engine --save
```

## Basic Example
```
const {executeEngine} = require('nested-rules-engine');

// Step1: Define your conditional rules
const rules = {
  "you_are_a_human": {
    "you_are_kind": "help_me_find_my_book",
    "you_are_smart": "please_do_my_homework",
  },
  "default": "please_do_my_homework"
};

// Step2: make set of inputs collection
const inputs = {
  "type" : "human",
  "kindnessLevel": 0,
  "intelligence": 10
}

// Step3: Make your custom Functions
const functions = {
  default : () => true,
  you_are_a_human: ({type}) => type === 'human',
  you_are_kind: ({kindnessLevel}) => kindnessLevel > 300,
  you_are_smart: ({intelligence}) => intelligence > 5,
  help_me_find_my_book: () => ({
    payload: 'lets help someone',
    effort: 'finding the book'
  }),
  please_do_my_homework: () => ({
    payload: 'doing homework',
    effort: 'im getting sick'
  })
};

// Step4: Execute Engine
const res = executeEngine(inputs, functions, rules);

// Output res:
/* 
[{
  payload: 'doing homework',
  effort: 'im getting sick'
}]
*/
```


## Documentation
Engine Execution Signature: 
```
executeEngine(variables, functions, rules, options);
```

### Inputs 

<code> variables </code>  Collection of values on which rule engine will execute
You can change these collection of variables (Add/Edit/Delte them) as you traverse the decision tree of rules.

<code> functions </code>  Collection of functions that decide which way the tree should be traversed.

* In case the function indicates a final decision in tree (leaf of decision tree): Output can be anything that you want to see as `result`
* In case the function is makes an intermediate decision (branch of decision tree): 
 if output is `true`: this means this branch should be traversed
 else: the function will be executed

<code> rules </code>  Decision Tree that will be traversed by this Rule Engine

<code> options </code>
* verbose(boolean): Makes Sure you get enough logs while engine goes through all decision tree
* multiple(boolean): You can run multiple Decision Trees based on same inputs. Input sets are shared between each tree

### Outputs
<code> result </code>: Result of the engine execution. format of Result will be defined by you through `functions`

<code> logs </code>: Detailed logs while engine got executed (by default its disabled)

## Hard Examples
1. Example with verbose output, multiple executions [Find Here] (https://github.com/ayonious/nested-rules-engine/blob/master/test/multirun-verbose-example.js)
2. Example with Creating new set of inputs while engine is executing [Find Here] (https://github.com/ayonious/nested-rules-engine/blob/master/test/change-variables-example.js)

## License
[MIT](https://github.com/ayonious/nested-rules-engine/blob/master/LICENSE)
