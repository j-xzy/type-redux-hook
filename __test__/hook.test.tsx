import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { createStore } from 'type-redux';
import { createUseSelector } from '../src';

describe('useSelector', () => {
  let store = createStore({ one: 1, two: 2 }, {
    mutations: { mut: () => ({ one: 2, two: 3 }) },
    actions: {}
  });

  let useSelector = createUseSelector(store);

  let fn = jest.fn();

  function App() {
    const [name, setName] = React.useState('one');
    const [show, setShow] = React.useState(true);
    return (
      <div>
        {show && <Comp name={name} />}
        <button id='setName' onClick={() => setName('two')}></button>
        <button id='setShow' onClick={() => setShow(false)} ></button>
      </div>
    );
  }

  function Comp(props: any) {
    const { dynamic } = useSelector((s) => ({ dynamic: s[props.name] }));
    fn(dynamic);
    return null;
  }

  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    store = createStore({ one: 1, two: 2 }, {
      mutations: { mut: () => ({ one: 2, two: 3 }) },
      actions: {}
    });
    useSelector = createUseSelector(store);
    fn = jest.fn();
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
    store = null;
    useSelector = null;
    fn = null;
  });

  it('update mappedstate', () => {
    act(() => {
      ReactDOM.render(<App />, container);
    });

    expect(fn.mock.calls.length).toBe(1);

    expect(fn.mock.calls[0][0]).toBe(1);

    const button = container.querySelector('#setName');

    act(() => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(fn.mock.calls.length).toBe(3);

    expect(fn.mock.calls[1][0]).toBe(1);
    expect(fn.mock.calls[2][0]).toBe(2);
  });

  it('commit', () => {
    act(() => {
      ReactDOM.render(<App />, container);
    });

    expect(fn.mock.calls.length).toBe(1);

    expect(fn.mock.calls[0][0]).toBe(1);

    act(() => {
      store.commit('mut');
    });

    expect(fn.mock.calls.length).toBe(2);

    expect(fn.mock.calls[1][0]).toBe(2);
  });

  it('unmount', () => {
    act(() => {
      ReactDOM.render(<App />, container);
    });

    expect(fn.mock.calls.length).toBe(1);

    expect(fn.mock.calls[0][0]).toBe(1);

    const button = container.querySelector('#setShow');

    act(() => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    act(() => {
      store.commit('mut');
    });

    expect(fn.mock.calls.length).toBe(1);
  });
});
