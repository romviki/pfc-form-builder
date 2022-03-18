import { createContext, useReducer } from 'react';
import globalReducer from './GlobalReducer';

export const GlobalContext = createContext({ error: null });

function GlobalContextProvider({ children }) {
  const reducerInitialState = {
    error: null,
    loading: false,
  };

  const [state, dispatch] = useReducer(globalReducer, reducerInitialState);

  return (
    <GlobalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContextProvider;
