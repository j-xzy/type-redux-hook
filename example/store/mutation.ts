import { IState } from './index';

export function append(getState: () => IState, text: string) {
  const state = getState();
  const maxId = state.maxId + 1;
  const nextState: IState = { ...state, list: [...state.list, { id: maxId, text, done: false }], maxId };
  return nextState;
}

export function toggle(getState: () => IState, id: number) {
  const state = getState();
  let index = -1;
  const todo = state.list.find((item, idx) => {
    if (item.id === id) {
      index = idx;
      return true;
    }
    return false;
  });

  if (!todo) {
    return state;
  }

  const done = !todo.done;
  const list = [...state.list];
  list.splice(index, 1, { ...state.list[index], done });

  return { ...state, list };
}

export function deleteItem(getState: () => IState, id: number) {
  let index = -1;
  const state = getState();
  const todo = state.list.find((item, idx) => {
    if (item.id === id) {
      index = idx;
      return true;
    }
    return false;
  });

  if (!todo) {
    return state;
  }
  const list = [...state.list];
  list.splice(index, 1);
  return { ...state, list };
}
