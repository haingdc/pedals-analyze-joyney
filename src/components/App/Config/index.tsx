import React, { createContext } from 'react';


interface ConfigContextType {
  /* Toggle the Menu by hamburger button */
  isOpen: boolean;
}

export const ConfigContext = createContext<ConfigContextType | null>(null);
export const ConfigDispatchContext = createContext(null);

export const ConfigProvider: React.FunctionComponent = ({ children }) => {
  const [config, dispatch] = React.useReducer(configureReducer, initialState)
  return (
    <ConfigContext.Provider value={config}>
      <ConfigDispatchContext.Provider value={dispatch}>
        {children}
      </ConfigDispatchContext.Provider>
    </ConfigContext.Provider>
  );
}

export default ConfigProvider

const initialState = { isOpen: false }

type ACTIONTYPE =
  | { type: 'toggle'; payload: number }
  | { type: 'hide'; payload: string }

function configureReducer(state: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
    case 'toggle':
      return { ...state, isOpen: !state.isOpen }
    case 'hide':
      return { ...state, isOpen: false }
    default:
      throw new Error()
  }
}