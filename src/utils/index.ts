import {ElementStates} from "../types";

export const generateRandomArray = (size: number, min: number, max: number) => {
  const array = Array.from({length: size}, () => Math.floor(Math.random() * (max + 1)) + min)
  return array.map(ch => ({value: ch.toString(), state: ElementStates.Default}))
}
