// tslint:disable-next-line: no-reference
/// <reference path="../node_modules/type-redux/interface/typing.d.ts" />

import * as React from 'react';

type IMappedStateFunc<S, R> = (state: S) => R;

export function createUseDispatch<A extends TypeRedux.IActions<any, any, any>>(store: TypeRedux.IStore<any, any, A>) {
  function useDispatch() {
    return store.dispatch;
  }

  return useDispatch;
}

export function createUseCommit<C extends TypeRedux.IMutations<any>>(store: TypeRedux.IStore<any, C, any>) {
  function useCommit() {
    return store.commit;
  }

  return useCommit;
}

export function createUseMappedState<S>(store: TypeRedux.IStore<S, any, any>) {
  return function useMappedState<R>(mappedState: IMappedStateFunc<S, R>) {
    const savedMappedState = React.useRef(mappedState);
    const [state, setState] = React.useState(savedMappedState.current(store.getState()));

    React.useEffect(() => {
      savedMappedState.current = mappedState;
      const nextState = savedMappedState.current(store.getState());
      setState(nextState);
    }, [mappedState]);

    React.useEffect(() => {
      const unSubscribe = store.subscribe(() => {
        const nextState = savedMappedState.current(store.getState());
        setState(nextState);
      });
      return () => unSubscribe();
    }, []);

    return state;
  };
}
