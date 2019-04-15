import { IGetState } from './index';

export function append(getState: IGetState, text: string) {
  const state = getState();
  const maxId = state.maxId + 1;
  const nextState = { ...state, list: [...state.list, { id: maxId, text, done: false }], maxId };
  return nextState;
}

export function toggle(getState: IGetState, id: number) {
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

export function deleteItem(getState: IGetState, id: number) {
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

export function status(getState: IGetState, text: string) {
  return { ...getState(), status: text };
}

export function url(getState: IGetState, payload: string) {
  return { ...getState(), url: payload };
}
