// tslint:disable-next-line: no-reference
/// <reference path="../node_modules/type-redux/interface/typing.d.ts" />

import * as React from 'react';
import { shallowEqual } from './util';

type IMappedStateFunc<S, R> = (state: S) => R;

export function createUseSelector<S>(store: TypeRedux.IStore<S, any, any>) {
  return function useSelector<R>(mappedState: IMappedStateFunc<S, R>) {
    const savedMappedState = React.useRef(mappedState);
    const [state, setState] = React.useState(savedMappedState.current(store.getState()));
    const lastState = React.useRef(state);

    const update = React.useCallback(() => {
      const nextState = savedMappedState.current(store.getState());
      if (!shallowEqual(nextState, lastState.current)) {
        setState(nextState);
      }
      lastState.current = nextState;
    }, []);

    React.useEffect(() => {
      savedMappedState.current = mappedState;
      update();
    }, [mappedState]);

    React.useEffect(() => {
      const unSubscribe = store.subscribe(update);
      return () => unSubscribe();
    }, []);

    return state;
  };
}
