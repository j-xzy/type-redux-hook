# type-redux的react-hook

```
npm install type-redux  type-redux-hook
```

## 使用

``` ts
import { createUseMappedState } from 'type-redux-hook';
import { createStore } from 'type-redux';

const store = createStore(todo, state);

export const useCommit = store.commit(store);

export const useDispatch = store.dispatch(store);

export const useMappedState = createUseMappedState(store);

```

``` ts
import { commit, dispatch, useMappedState } from './xxx';

function Component() {
  const dispatchAsync = useDispatch(true);
  const list = useMappedState((state) => state.list);

  return <div onClick={() => dispatch('xxx', 'xxx')} ></div>;
}
```

## Example

https://github.com/whj1995/type-redux-hook/tree/master/demo