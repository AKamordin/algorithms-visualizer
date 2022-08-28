import {DELAY_IN_MS} from "../../constants";
import {AnimationFunctions} from "../../types";

export class AbstractAlgorithm {

  loading: boolean
  pause  : number
  animationFunctions: AnimationFunctions

  constructor(animationFunctions: AnimationFunctions, pause: number = DELAY_IN_MS) {
    this.loading = false
    this.animationFunctions = animationFunctions
    this.pause = pause
  }

  swap<T>(array: T[], firstIndex: number, secondIndex: number): void {
    [array[firstIndex], array[secondIndex]] = [array[secondIndex], array[firstIndex]]
  }

  delay(): Promise<null> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(null)
      }, this.pause)
    })
  }

  setLoading = (value: boolean): void => {
    this.loading = value
    this.animationFunctions.loadingFunc(this.loading)
  }

}
