const { createContext, useContext, useReducer } = require('react');

const CountContext = createContext();

function reducer(prevCount, action) {
  const { type } = action;
  switch (type) {
    case 'PLUS':
      return prevCount + 1;
    default:
      return prevCount;
  }
}

function CountProvider({ children }) {
  const [count, dispatch] = useReducer(reducer, 0);

  return (
    <CountContext.Provider value={{ count, dispatch }}>
      {children}
    </CountContext.Provider>
  );
}

function useCount() {
  return useContext(CountContext);
}

export { CountProvider, useCount };
