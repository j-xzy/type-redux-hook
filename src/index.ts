import * as React from 'react';
import { IReducers } from 'type-redux';
import { Store } from 'type-redux/lib/createStore';
import { shallowEqual } from './util';

type IMappedStateFunc<S, R> = (state: S) => R;

export function createUseDispatch<S, T extends IReducers<S>>(store: Store<S, T>) {

  function useDispatch(async: false): Store<S, T>['dispatch'];
  function useDispatch(async: true): Store<S, T>['dispatchAsync'];
  function useDispatch(): Store<S, T>['dispatch'];
  function useDispatch(async = false) {
    if (async) {
      return store.dispatchAsync;
    }
    return store.dispatch;
  }

  return useDispatch;
}

export function createUseMappedState<S, T extends IReducers<S>>(store: Store<S, T>) {
  return function useMappedState<R>(mappedState: IMappedStateFunc<S, R>) {
    const [state, setState] = React.useState(mappedState(store.State));
    const lastState = React.useRef(state);

    React.useEffect(() => {
      const unSubscribe = store.subscribe(() => {
        const nextState = mappedState(store.State);
        if (!shallowEqual(lastState.current, nextState)) {
          setState(mappedState(store.State));
        }
        lastState.current = nextState;
      });
      return () => unSubscribe();
    });

    return state;
  };
}
