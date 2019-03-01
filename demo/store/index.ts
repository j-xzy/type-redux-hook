import { createStore } from 'type-redux';
import { createUseDispatch, createUseMappedState } from '../../src';
import * as todo from './todo';

export interface IListItem {
  id: number;
  done: boolean;
  text: string;
}

const state = {
  list: [] as IListItem[],
  maxId: 0,
  noreRender: 'noreRender'
};

const store = createStore(todo, state);

export type IState = typeof state;

export const useDispatch = createUseDispatch(store);

export const useMappedState = createUseMappedState(store);
