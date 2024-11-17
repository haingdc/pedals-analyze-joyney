import React from 'react'
import { ConfigContext, ConfigDispatchContext } from "@components/App/Config/index.tsx"

export function useConfig() {
  return React.useContext(ConfigContext);
}

export function useConfigDispatch() {
  return React.useContext(ConfigDispatchContext);
}