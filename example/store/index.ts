import { createStore } from 'type-redux';
import { createUseMappedState } from '../../src';
import * as actions from './action';
import * as mutations from './mutation';

export interface IListItem {
  id: number;
  done: boolean;
  text: string;
}

const initialState = {
  list: [] as IListItem[],
  url: '',
  maxId: 0,
  status: ''
};

const reducers = { mutations, actions };

const store = createStore(initialState, reducers);

export const useMappedState = createUseMappedState(store);
export const commit = store.commit;
export const dispatch = store.dispatch;

export type IState = typeof initialState;
export type IGetState = () => IState;
export type IMutations = typeof reducers['mutations'];
export type IActions = typeof reducers['actions'];
export type ICtx = TypeRedux.IContext<IState, IMutations, IActions>;
