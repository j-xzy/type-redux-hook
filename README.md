# type-redux的react-hook

```
npm install type-redux  type-redux-hook
```

## 使用

``` ts
import { createUseDispatch, createUseMappedState } from 'type-redux-hook';
import { createStore } from 'type-redux';

const store = createStore(todo, state);

export const useDispatch = createUseDispatch(store);

export const useMappedState = createUseMappedState(store);

```

``` ts
import { useDispatch, useMappedState } from './xxx';

function Component() {
  const dispatch = useDispatch();
  const dispatchAsync = useDispatch(true);
  const list = useMappedState((state) => state.list);

  return <div onClick={() => dispatch('xxx', 'xxx')} ></div>;
}
```
useDispatch接收一个是否为异步action的参数，默认为false

## Example

https://github.com/whj1995/type-redux-hook/tree/master/demo