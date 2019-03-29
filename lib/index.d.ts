import { IReducers } from 'type-redux';
import { Store } from 'type-redux/lib/createStore';
declare type IMappedStateFunc<S, R> = (state: S) => R;
export declare function createUseDispatch<S, T extends IReducers<S>>(store: Store<S, T>): {
    (async: false): import("type-redux").IDispatch<S, T>;
    (async: true): import("type-redux").IDispatchAsync<S, T>;
    (): import("type-redux").IDispatch<S, T>;
};
export declare function createUseMappedState<S, T extends IReducers<S>>(store: Store<S, T>): <R>(mappedState: IMappedStateFunc<S, R>) => R;
export {};
