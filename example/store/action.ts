import { ICtx, IListItem } from './index';

export async function getListAsync(ctx: ICtx) {
  const result: string[] = await fetch('http://localhost:3000', { method: 'GET' }).then((data) => data.json());
  const state = ctx.getState();
  let maxId = state.maxId;
  const newList: IListItem[] = result.map((text) => {
    maxId += 1;
    return {
      text,
      done: false,
      id: maxId
    };
  });
  return { ...state, list: [...state.list, ...newList], maxId };
}
