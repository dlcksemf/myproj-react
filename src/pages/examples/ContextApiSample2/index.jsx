import { CountProvider, useCount } from './context.js';

function ContextApiSample2() {
  return (
    <div>
      <h2>Context Api Sample 2</h2>
      <CountProvider>
        <Level1 />
      </CountProvider>
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
  const { count, dispatch } = useCount();
  return (
    <div>
      <h2>Level 3</h2>
      {count}
      <hr />
      <button onClick={() => dispatch({ type: 'PLUS' })}>Click Me!</button>
    </div>
  );
}

export default ContextApiSample2;
