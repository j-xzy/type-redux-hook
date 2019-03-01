import * as React from 'react';
import { shallowEqual } from './util';
export function createUseDispatch(store) {
    function useDispatch(async = false) {
        if (async) {
            return store.dispatchAsync;
        }
        return store.dispatch;
    }
    return useDispatch;
}
export function createUseMappedState(store) {
    return function useMappedState(mappedState) {
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
//# sourceMappingURL=index.js.map