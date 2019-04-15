import { ICtx, IListItem } from './index';

export async function getListAsync(ctx: ICtx) {
  await ctx.dispatch('fetchRepurl');
  ctx.commit('status', 'fetch repos');
  const reps = await fetch(ctx.getState().url).then((raw) => raw.json());
  ctx.commit('status', 'done');
  reps.forEach(({ name }: any) => {
    ctx.commit('append', name);
  });
}

export async function fetchRepurl(ctx: ICtx) {
  ctx.commit('status', 'fetch repos_url...');
  const user = await fetch('https://api.github.com/users/whj1995').then((raw) => raw.json());
  ctx.commit('url', user.repos_url);
}
