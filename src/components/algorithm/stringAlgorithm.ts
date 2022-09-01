import {AbstractAlgorithm} from "./abstractAlgorithm";
import {AnimationFunctions, ElementStates, IElement} from "../../types";
import {DELAY_IN_MS} from "../../constants";

export class StringAlgorithm extends AbstractAlgorithm {

  charArray: IElement[] | undefined

  constructor(animationFunctions: AnimationFunctions, pause: number = DELAY_IN_MS) {
    super(animationFunctions, pause)
    this.charArray = []
  }

  resetAnimation = (value: string): void => {
    this.charArray = Array.from(value, ch => ({value: ch, state: ElementStates.Default}))
    this.animationFunctions.resultFunc([...this.charArray])
  }

  animate = async () => {
    this.setLoading(true)
    if (!this.charArray || this.charArray?.length === 0) {
      this.setLoading(false)
      return
    }
    let left = 0
    let right = this.charArray.length - 1 || 0
    while (left <= right) {
      this.charArray[left].state = ElementStates.Changing
      this.charArray[right].state = ElementStates.Changing
      this.animationFunctions.resultFunc([...this.charArray])
      await this.delay()
      this.swap(this.charArray, left, right)
      this.charArray[left].state = ElementStates.Modified
      this.charArray[right].state = ElementStates.Modified
      this.animationFunctions.resultFunc([...this.charArray])
      await this.delay()
      left++
      right--
    }
    this.setLoading(false)
  }
}
