import * as React from 'react';
import { useDispatch, useMappedState, useCommit } from './store';

export function App() {
  const dispatch = useDispatch();
  const { list, maxId } = useMappedState((state) => ({ list: state.list, maxId: state.maxId }));

  React.useEffect(() => {
    dispatch('getListAsync');
  }, []);
  return (
    <div>
      <Foo />
      {list.map((data) => <Item key={data.id} id={data.id} />)}
      <Add />
      maxId:{maxId}
    </div>
  );
}

function Item(props: { id: number }) {
  const commit = useCommit();
  const list = useMappedState((state) => state.list);
  const item = list.find(({ id }) => id === props.id)!;

  return (
    <div onClick={() => commit('toggle', props.id)} style={{ textDecoration: item.done ? 'line-through' : 'none', border: '1px solid #000' }}>
      {item.text}
      <button onClick={() => commit('deleteItem', props.id)}>X</button>
    </div>
  );
}

function Foo() {
  const noreRender = useMappedState((state) => state.noreRender);
  return <div>{noreRender}</div>;
}

function Add() {
  const commit = useCommit();
  const [state, setState] = React.useState('');
  return (
    <div>
      <input type='text' value={state} onChange={(e) => setState(e.target.value)} />
      <button onClick={() => { commit('append', state), setState(''); }}>增加</button>
    </div>
  );
}