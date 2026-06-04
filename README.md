# nested-rules-engine

<h3 align="center">Decision-tree based rules engine</h3>
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

`nested-rules-engine` runs a decision tree that you describe with plain JavaScript objects or JSON.

You provide three things:

1. `inputs`: the data you want to check.
2. `rules`: the decision tree.
3. `functions`: small functions that either choose a branch or return the final result.

The engine walks the tree from top to bottom. When a condition function returns `true`, it follows that branch. When it reaches a leaf, it runs the matching result function.

## Features

- Write rules as readable JSON-like objects.
- Nest rules to model multi-step decisions.
- Change the input object while the tree is running, if needed.
- Run one tree or multiple trees against the same inputs.

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
  day: string;
  weather: string;
}

interface Result {
  plan: string;
}

// 1. Describe the tree.
const rules = {
  is_weekend: {
    is_raining: 'stay_home',
    default: 'go_outside',
  },
  default: 'go_to_work',
} as const;

// 2. Provide the input data.
const inputs: Inputs = {
  day: 'saturday',
  weather: 'sunny',
};

// 3. Add one function for every rule name and result name.
const functions = {
  default: () => true,
  is_weekend: ({ day }: Inputs) => day === 'saturday' || day === 'sunday',
  is_raining: ({ weather }: Inputs) => weather === 'rainy',
  stay_home: (): Result => ({ plan: 'Stay home' }),
  go_outside: (): Result => ({ plan: 'Go outside' }),
  go_to_work: (): Result => ({ plan: 'Go to work' }),
};

// 4. Run the engine.
const res = executeEngine(inputs, functions, rules);

// res is:
/*
{
  result: { plan: 'Go outside' },
  logs: []
}
*/
```

## Documentation

Execution signature:

```typescript
executeEngine(variables: Record<string, any>, functions: Record<string, Function>, rules: Record<string, any>, options?: Options);
```

### Inputs

- `variables`: the input object passed to every function.
  Functions receive this object by reference, so they can add, edit, or delete values while the tree is running.

- `functions`: a function map. Every key used in `rules` must have a matching function.

  - Branch functions should return `true` when the engine should follow that branch.
  - Leaf functions return the final value you want in `result`.

- `rules`: the decision tree to run.

- `options`: optional settings.
  - `verbose` (`boolean`): include execution logs.
  - `multiple` (`boolean`): run an array of decision trees against the same inputs.

### Outputs

- `result`: the value returned by the selected leaf function.
- `logs`: execution logs. This is an empty array unless `verbose` is enabled, or an error object if validation fails.

## How Defaults Work

Use a `default` branch when you want a fallback:

```typescript
const rules = {
  is_admin: 'show_admin_dashboard',
  default: 'show_regular_dashboard',
};

const functions = {
  default: () => true,
  is_admin: ({ role }) => role === 'admin',
  show_admin_dashboard: () => 'Admin dashboard',
  show_regular_dashboard: () => 'Regular dashboard',
};
```

If `is_admin` returns `false`, the engine continues to the next rule. Since `default` returns `true`, the fallback result is used.

## Advanced Examples

1. [Verbose output and multiple executions](https://github.com/ayonious/nested-rules-engine/blob/master/test/multirun-verbose-example.test.ts)
2. [Changing inputs while the engine is running](https://github.com/ayonious/nested-rules-engine/blob/master/test/change-variables-example.test.ts)

## License

[MIT](https://github.com/ayonious/nested-rules-engine/blob/master/LICENSE)
