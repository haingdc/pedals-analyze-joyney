import { ConfigContext, ConfigDispatchContext } from "@components/App/Config/index.tsx"
import { useContext } from "react"

export function useConfig() {
  const currentConfigContext = useContext(ConfigContext);
  if (!currentConfigContext) {
    throw new Error("useConfig must be used within <ConfigContext.Provider>");
  }
  return currentConfigContext;
}

export function useConfigDispatch() {
  const currentConfigDispatchContext = useContext(ConfigDispatchContext);
  if (!currentConfigDispatchContext) {
    throw new Error("useConfigDispatch must be used within <ConfigDispatchContext.Provider>");
  }
  return currentConfigDispatchContext;
}