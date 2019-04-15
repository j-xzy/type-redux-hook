# type-redux的react-hook

```
npm install type-redux  type-redux-hook
```

## 使用

``` ts
import { createUseDispatch, createUseCommit, createUseMappedState } from 'type-redux-hook';
import { createStore } from 'type-redux';

const store = createStore(todo, state);

export const useCommit = createUseCommit(store);

export const useDispatch = createUseDispatch(store);

export const useMappedState = createUseMappedState(store);

```

``` ts
import { useCommit, useDispatch, useMappedState } from './xxx';

function Component() {
  const commit = useCommit();
  const dispatch = useDispatch();
  const dispatchAsync = useDispatch(true);
  const list = useMappedState((state) => state.list);

  return <div onClick={() => dispatch('xxx', 'xxx')} ></div>;
}
```

## Example

https://github.com/whj1995/type-redux-hook/tree/master/demo