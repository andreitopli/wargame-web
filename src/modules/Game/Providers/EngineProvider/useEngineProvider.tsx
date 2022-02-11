import { useContext } from "react"
import { EngineContext } from "./EngineProvider"

export const useEngineProvider = () => {
  return useContext(EngineContext);
}