# type-redux的react-hook

[![npm version](https://badge.fury.io/js/type-redux-hook.svg)](https://badge.fury.io/js/type-redux-hook)
[![Build Status](https://www.travis-ci.org/whj1995/type-redux-hook.svg?branch=master)](https://www.travis-ci.org/whj1995/type-redux-hook)
[![Coverage Status](https://coveralls.io/repos/github/whj1995/type-redux-hook/badge.svg?branch=master)](https://coveralls.io/github/whj1995/type-redux-hook?branch=master)
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
  const { list, maxId } = useMappedState((state) => ({ list: state.list, maxId: state.maxId }));
  return <div onClick={() => dispatch('xxx', 'xxx')} ></div>;
}
```

## Example

https://github.com/whj1995/type-redux-hook/tree/master/demo