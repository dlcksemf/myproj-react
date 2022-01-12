import { createContext, useContext, useReducer, useState } from 'react';

// 인자 : context에서 다룰 값의 디폴트 값
const MessageContext = createContext();

function reducer(prevCount, action) {
  const { type } = action;
  switch (type) {
    case 'PLUS':
      return prevCount + 1;
    default:
      return prevCount;
  }
}

function ContextApiSample() {
  const [count, dispatch] = useReducer(reducer, 0);

  return (
    <div>
      <h2>Context Api Sample</h2>
      <button
        onClick={() => {
          dispatch({ type: 'PLUS' });
        }}
      >
        1씩 증가
      </button>
      <MessageContext.Provider value={{ count, dispatch }}>
        <Level1 />
      </MessageContext.Provider>
    </div>
  );
}

function Level1() {
  return (
    <div>
      <h2>Level 1</h2>
      <Level2 />
    </div>
  );
}

function Level2() {
  return (
    <div>
      <h2>Level 2</h2>
      <Level3 />
    </div>
  );
}

function Level3() {
  return (
    <div>
      <h2>Level 3</h2>
      <MessageContext.Consumer>{({ count }) => count}</MessageContext.Consumer>
      <Level4 />
    </div>
  );
}

function Level4() {
  const { count, dispatch } = useContext(MessageContext);
  return (
    <div>
      <button
        onClick={() => {
          dispatch({ type: 'PLUS' });
        }}
      >
        Click Me!
      </button>
      <h2>Level 4</h2>
      {count}
    </div>
  );
}

export default ContextApiSample;
