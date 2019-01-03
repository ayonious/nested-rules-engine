# Conditionally Nested Rules Engine

[![Build Status](https://travis-ci.org/ayonious/nested-rules-engine.svg?branch=master)](https://travis-ci.org/ayonious/nested-rules-engine)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fayonious%2Fnested-rules-engine.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fayonious%2Fnested-rules-engine?ref=badge_shield)
[![dependencies Status](https://david-dm.org/ayonious/nested-rules-engine/status.svg)](https://david-dm.org/ayonious/nested-rules-engine)
[![devDependencies Status](https://david-dm.org/ayonious/nested-rules-engine/dev-status.svg)](https://david-dm.org/ayonious/nested-rules-engine?type=dev)

## Synopsis
A simple Decision tree based Rule Engine described using json files. Rules are executed according to decision tree. Create a set of rules (make them nested as you like) and based on set of inputs run the rules.

## Features
1. Rules expressed in huaman readable JSON
2. Create new set of inputs or change existing inputs as you traverse rules tree
3. Fast by default uses mostly bfs and dfs algorithms
4. Easy to Debug with --verbose options
5. Do multiple executions with parallel Option
6. Synchronous (and Async: TODO)


## Installation
```
npm install nested-rules-engine
```

## Basic Example
```
const {executeEngine} = require('nested-rules-engine');

// Step1: Define your conditional rules
const rules = {
  "you_are_a_human": {
    "you_are_kind":{
      "you_are_older_than_15": "you_must_be_something"
    },
    "you_are_smart": {
      "you_live_near_my_house": "please_do_my_homework"
    }
  }
};

//Step2: make set of inputs collection
const inputs = {
  "type" : "human",
  "racismLevel" : 1,
  "iqLevel": 500,
  "kindnessLevel": 0,
  "postcode": 12223,
  "curiosityLevel": 111111,
  "feeling": "bad",
  "temp": 101
}

// Step3: Make your custom Functions
const functions = {
	you_are_a_human: ({type}) => {
		return type === 'human';
	},
	you_are_smart: ({iqLevel}) => {
		return iqLevel > 300;
	},
	you_are_kind: ({kindnessLevel}) => {
		return kindnessLevel > 300;
	},
	you_are_older_than_15: ({age}) => {
		return age > 15;
	},
	you_live_near_my_house: ({postcode}) => {
		return postcode === 12223;
	},
	please_do_my_homework: () => {
		return {
			payload: 'doing homework',
			effort: 'im getting sick'
		};
	},
	you_must_be_something: () => {
		return {
			payload: 'data',
			effort: 'infinity'
		};
	}
};

// Step4: Execute Engine
const res = executeEngine(inputs, functions, rules);
```


## Documentation
Engine Execution Signature: 
```
executeEngine(inputs, functions, rules, options);
```

### Inputs 
#### inputs: Collection of input values/ constants on which rule engine will execute
Sample 
```
{
  age: 12
  name: something
}
```

#### functions: Collection of functions that decide which way the tree should be traversed. 

In case the function indicates a final decision in tree (leaf): 
```
  Output can be anything that you want to see as `result`
```

In case the function is makes intermediate decision: 
```
if output is true this means this branch should be traversed
else the function will be executed
```

Sample
```
{
	you_are_a_human: ({type}) => {
		return type === 'human';
	},
	default: () => {
		return true;
	}
}
```

#### rules: 
Decision Tree that will be traverse by this Rule Engine
Sample
```
{
  "you_are_a_human": {
    "you_are_kind": "you_must_be_something",
    "you_are_smart": "please_do_my_homework"
  }
}
```

#### options
1. verbose(boolean): Makes Sure you get enough logs while engine goes through all decision tree
2. isParallel(boolean): You can run multiple Decision Trees based on same inputs. Input sets are shared between each tree
Sample
```
{
  verbose: true
  isParallel: true
}
```


### Outputs
1. result: Result of the engine execution. format of Result will be defined by you through `functions`
2. logs: Detailed logs while engine got executed (by default its disabled)

## Hard Examples
1. Example with verbose output, multiple executions
2. Example with Creating new set of inputs while engine is executing

## Debugging
To see details logging turn on logging with option
```
executeEngine(inputs, functions, rules, { verbose: true });
```

## License
[MIT](./LICENSE)