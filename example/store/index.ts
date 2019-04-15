import { createStore } from 'type-redux';
import { createUseCommit, createUseDispatch, createUseMappedState } from '../../src';
import * as actions from './action';
import * as mutations from './mutation';

export interface IListItem {
  id: number;
  done: boolean;
  text: string;
}

const initialState = {
  list: [] as IListItem[],
  maxId: 0,
  noreRender: 'noreRender'
};

const reducers = { mutations, actions };

const store = createStore(initialState, reducers);

export const useMappedState = createUseMappedState(store);
export const useDispatch = createUseDispatch<IActions>(store);
export const useCommit = createUseCommit<IMutations>(store);

export type IState = typeof initialState;
export type IGetState = () => IState;
export type IMutations = typeof reducers['mutations'];
export type IActions = typeof reducers['actions'];
export type ICtx = TypeRedux.IContext<IState, IMutations, IActions>;