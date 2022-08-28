import {AbstractAlgorithm} from "./abstractAlgorithm";
import {AnimationFunctions, ElementStates} from "../../types";
import {DELAY_IN_MS} from "../../constants";

export class FibonacciAlgorithm extends AbstractAlgorithm {

  value: number | undefined

  constructor(animationFunctions: AnimationFunctions, pause: number = DELAY_IN_MS) {
    super(animationFunctions, pause)
    this.value = 0
  }

  resetAnimation = (value: number): void => {
    this.value = value
    this.animationFunctions.resultFunc([])
  }

  animate = async () => {
    this.setLoading(true)
    if (!this.value || this.value <= 0) {
      this.setLoading(false)
      return
    }
    const array: number[] = [0, 1];
    this.animationFunctions.resultFunc(array.slice(1).map(n => ({value: n.toString(), state: ElementStates.Default})))
    await this.delay()
    for (let i = 2; i <= this.value + 1; i++) {
      array.push(array[i - 2] + array[i - 1])
      this.animationFunctions.resultFunc(array.slice(1).map(n => ({value: n.toString(), state: ElementStates.Default})))
      await this.delay()
    }
    this.setLoading(false)
  }
}
