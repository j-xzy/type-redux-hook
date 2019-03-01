import { IReducers } from 'type-redux';
import { Store } from 'type-redux/lib/createStore';
declare type IMappedStateFunc<S, R> = (state: S) => R;
export declare function createUseDispatch<S, T extends IReducers<S>>(store: Store<S, T>): {
    (async: false): <K extends Exclude<keyof T, { [K in keyof T]: ReturnType<T[K]> extends Promise<any> ? K : never; }[keyof T]>>(type: K, payload: Parameters<T[K]>[0]) => void;
    (async: true): <K extends { [K in keyof T]: ReturnType<T[K]> extends Promise<any> ? K : never; }[keyof T]>(type: K, payload: Parameters<T[K]>[0]) => Promise<void>;
    (): <K extends Exclude<keyof T, { [K in keyof T]: ReturnType<T[K]> extends Promise<any> ? K : never; }[keyof T]>>(type: K, payload: Parameters<T[K]>[0]) => void;
};
export declare function createUseMappedState<S, T extends IReducers<S>>(store: Store<S, T>): <R>(mappedState: IMappedStateFunc<S, R>) => R;
export {};
