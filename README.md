# type-redux的react-hook

[![npm version](https://badge.fury.io/js/type-redux-hook.svg)](https://badge.fury.io/js/type-redux-hook)

```
npm install type-redux  type-redux-hook
```

## 使用

``` ts
import { createUseMappedState } from 'type-redux-hook';
import { createStore } from 'type-redux';

...

const store = createStore(todo, state);

export const useMappedState = createUseMappedState(store);
export const commit = store.commit;
export const dispatch = store.dispatch;

```

``` ts
import { commit, dispatch, useMappedState } from './xxx';

function Component() {
  return <div onClick={() => dispatch('xxx', 'xxx')} ></div>;
}
```

## Example

https://github.com/whj1995/type-redux-hook/tree/master/demo