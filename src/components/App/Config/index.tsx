import React, { createContext } from "react"

interface ConfigContextType {
  /* Toggle the Menu by hamburger button */
  isOpen: boolean
}

export const ConfigContext = createContext<ConfigContextType | null>(null)

export const ConfigDispatchContext = createContext<
  React.Dispatch<ACTIONTYPE_Config> | null
>(null)

export const ConfigProvider: React.FunctionComponent<
  React.PropsWithChildren
> = ({ children }) => {
  const [config, dispatch] = React.useReducer(configureReducer, initialState)
  return (
    <ConfigContext.Provider value={config}>
      <ConfigDispatchContext.Provider value={dispatch}>
        {children}
      </ConfigDispatchContext.Provider>
    </ConfigContext.Provider>
  )
}

export default ConfigProvider

const initialState = { isOpen: false }

type ACTIONTYPE_Config = { type: "toggle" } | { type: "hide" }

function configureReducer(
  state: typeof initialState,
  action: ACTIONTYPE_Config,
) {
  switch (action.type) {
    case "toggle":
      return { ...state, isOpen: !state.isOpen }
    case "hide":
      return { ...state, isOpen: false }
    default:
      throw new Error()
  }
}
