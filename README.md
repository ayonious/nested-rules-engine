# nested-rules-engine

<h3 align="center">🌲Decision Tree based Rules Engine</h3>
<p align="center">
  <a href="https://codecov.io/gh/ayonious/nested-rules-engine">
    <img alt="codecov" src="https://codecov.io/gh/ayonious/nested-rules-engine/branch/master/graph/badge.svg">
  </a>
  <a href="https://badge.fury.io/js/nested-rules-engine">
    <img alt="npm version" src="https://badge.fury.io/js/nested-rules-engine.svg">
  </a>
  <a href="https://packagephobia.com/result?p=nested-rules-engine">
    <img alt="install size" src="https://packagephobia.com/badge?p=nested-rules-engine@latest">
  </a>
</p>
<p align="center">
  <a href="https://github.com/prettier/prettier">
    <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat">
  </a>
  <a href="https://github.com/semantic-release/semantic-release">
    <img alt="semantic-release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg">
  </a>
</p>

## Synopsis

A simple Decision tree based Rule Engine described using json files. Rules are executed according to decision tree. Create a set of rules (make them nested as you like) and based on set of inputs run the rules.

## Features

1. Rules expressed in human readable JSON
2. Create new set of inputs or change existing inputs as you traverse rules tree
3. Do multiple executions of rules set

## Installation

```bash
npm install nested-rules-engine --save
# or
yarn add nested-rules-engine
```

## Basic Example

```typescript
import { executeEngine } from 'nested-rules-engine';

interface Inputs {
  type: string;
  kindnessLevel: number;
  intelligence: number;
}

interface Result {
  payload: string;
  effort: string;
}

// Step1: Define your conditional rules
const rules = {
  you_are_a_human: {
    you_are_kind: 'help_me_find_my_book',
    you_are_smart: 'please_do_my_homework',
  },
  default: 'please_do_my_homework',
} as const;

// Step2: make set of inputs collection
const inputs: Inputs = {
  type: 'human',
  kindnessLevel: 0,
  intelligence: 10,
};

// Step3: Make your custom Functions
const functions = {
  default: () => true,
  you_are_a_human: ({ type }: Inputs) => type === 'human',
  you_are_kind: ({ kindnessLevel }: Inputs) => kindnessLevel > 300,
  you_are_smart: ({ intelligence }: Inputs) => intelligence > 5,
  help_me_find_my_book: (): Result => ({
    payload: 'lets help someone',
    effort: 'finding the book',
  }),
  please_do_my_homework: (): Result => ({
    payload: 'doing homework',
    effort: 'im getting sick',
  }),
};

// Step4: Execute Engine
const res = executeEngine(inputs, functions, rules);

// Output res:
/*
{
  result: { payload: 'doing homework', effort: 'im getting sick' },
  logs: []
}
*/
```

## Documentation

Engine Execution Signature:

```typescript
executeEngine(variables: Record<string, any>, functions: Record<string, Function>, rules: Record<string, any>, options?: Options);
```

### Inputs

- `variables` Collection of values on which rule engine will execute.
  You can change these collection of variables (Add/Edit/Delete them) as you traverse the decision tree of rules.

- `functions` Collection of functions that decide which way the tree should be traversed.

  - In case the function indicates a final decision in tree (leaf of decision tree): Output can be anything that you want to see as `result`
  - In case the function makes an intermediate decision (branch of decision tree):
    - if output is `true`: this means this branch should be traversed
    - else: the function will be executed

- `rules` Decision Tree that will be traversed by this Rule Engine

- `options` there are different options that you can provide to customize the execution nature
  - `verbose` (boolean): Makes Sure you get enough logs while engine goes through all decision tree
  - `multiple` (boolean): You can run multiple Decision Trees based on same inputs. Input sets are shared between each tree

### Outputs

- `result`: Result of the engine execution. format of Result will be defined by you through `functions`
- `logs`: Detailed logs while engine got executed (by default its disabled)

## Advanced Examples

1. Example with verbose output, multiple executions [Find Here](https://github.com/ayonious/nested-rules-engine/blob/master/test/multirun-verbose-example.js)
2. Example with Creating new set of inputs while engine is executing [Find Here](https://github.com/ayonious/nested-rules-engine/blob/master/test/change-variables-example.js)

## License

[MIT](https://github.com/ayonious/nested-rules-engine/blob/master/LICENSE)
