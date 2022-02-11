import { useContext } from "react";
import { GameContext } from "./GameProvider";

export const useGameProvider = () => useContext(GameContext);