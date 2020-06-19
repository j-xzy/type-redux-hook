import * as React from 'react';
import { commit, dispatch, useSelector } from './store';

export function App() {
  React.useEffect(() => {
    dispatch('getListAsync');
  }, []);

  return (
    <div>
      <Foo />
      <List />
      <Add />
    </div>
  );
}

function List() {
  const { list, maxId } = useSelector((state) => ({ list: state.list, maxId: state.maxId }));
  return (
    <div>
      {list.map((data) => <Item key={data.id} id={data.id} />)}
      maxId:{maxId}
    </div>
  );
}

function Item(props: { id: number }) {
  const list = useSelector((state) => state.list);
  const item = list.find(({ id }) => id === props.id)!;

  return (
    <div onClick={() => commit('toggle', props.id)} style={{ textDecoration: item.done ? 'line-through' : 'none', border: '1px solid #000' }}>
      {item.text}
      <button onClick={() => commit('deleteItem', props.id)}>X</button>
    </div>
  );
}

function Foo() {
  const status = useSelector((state) => state.status);
  return <div>{status}</div>;
}

function Add() {
  const [state, setState] = React.useState('');
  return (
    <div>
      <input type='text' value={state} onChange={(e) => setState(e.target.value)} />
      <button onClick={() => { commit('append', state), setState(''); }}>增加</button>
    </div>
  );
}
