import { createContext, useReducer } from 'react';
import formsReducer from './FormsReducer';

export const FormsContext = createContext([]);

function FormsContextProvider({ children }) {
  const [state, dispatch] = useReducer(formsReducer, []);

  return (
    <FormsContext.Provider value={{ forms: state, dispatch }}>
      {children}
    </FormsContext.Provider>
  );
}

export default FormsContextProvider;
