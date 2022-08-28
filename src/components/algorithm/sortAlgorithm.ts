import {AbstractAlgorithm} from "./abstractAlgorithm";
import {AnimationFunctions, Direction, ElementStates, IElement, SortMethod} from "../../types";
import {DELAY_IN_MS, SORT_MAX_LEN, SORT_MAX_VALUE, SORT_MIN_LEN, SORT_MIN_VALUE} from "../../constants";

export class SortAlgorithm extends AbstractAlgorithm {

  method: SortMethod.Bubble | SortMethod.Selection
  direction: Direction.Ascending | Direction.Descending
  numberArray: IElement[]

  constructor(animationFunctions: AnimationFunctions, pause: number = DELAY_IN_MS) {
    super(animationFunctions, pause)
    this.direction = Direction.Ascending
    this.method = SortMethod.Selection
    this.numberArray = []
  }

  setMethod = (method: SortMethod.Bubble | SortMethod.Selection): void => {
    this.method = method
  }

  setDirection = (direction: Direction.Ascending | Direction.Descending): void => {
    this.direction = direction
  }

  resetAnimation = (): void => {
    const size = Math.floor(Math.random() * (SORT_MAX_LEN - SORT_MIN_LEN) + SORT_MIN_LEN)
    const array = Array.from({length: size}, () => Math.floor(Math.random() * SORT_MAX_VALUE) + SORT_MIN_VALUE)
    this.numberArray = [...array.map(ch => ({value: ch.toString(), state: ElementStates.Default}))]
    this.animationFunctions.resultFunc([...this.numberArray])
  }

  bubbleSort = async () => {
    for (let i = 0; i < this.numberArray.length; i++) {
      for(let j = 0 ; j < this.numberArray.length - i - 1; j++) {
        this.numberArray[j].state = ElementStates.Changing
        this.numberArray[j + 1].state = ElementStates.Changing
        this.animationFunctions.resultFunc([...this.numberArray])
        await this.delay()
        if (
          (this.direction === Direction.Ascending && Number(this.numberArray[j].value) > Number(this.numberArray[j + 1].value))
          ||
          (this.direction === Direction.Descending && Number(this.numberArray[j].value) < Number(this.numberArray[j + 1].value))
        ) {
          this.swap(this.numberArray, j, j + 1)
        }
        this.numberArray[j].state = ElementStates.Default
        if (j === this.numberArray.length - i - 2) {
          this.numberArray[j + 1].state = ElementStates.Modified
          if (j === 0) {
            this.numberArray[j].state = ElementStates.Modified
          }
        }
        this.animationFunctions.resultFunc([...this.numberArray])
        await this.delay()
      }
    }
  }

  selectionSort = async () => {
    for (let i = 0; i < this.numberArray.length; i++) {
      let mInd = i
      this.numberArray[i].state = ElementStates.Changing
      this.animationFunctions.resultFunc([...this.numberArray])
      await this.delay()
      for (let j = i + 1; j < this.numberArray.length; j++) {
        this.numberArray[j].state = ElementStates.Changing
        this.animationFunctions.resultFunc([...this.numberArray])
        await this.delay()
        if (
          (this.direction === Direction.Descending && Number(this.numberArray[mInd].value) < Number(this.numberArray[j].value))
          ||
          (this.direction === Direction.Ascending && Number(this.numberArray[mInd].value) > Number(this.numberArray[j].value))
        ){
          if (i !== mInd) {
            this.numberArray[mInd].state = ElementStates.Default
          }
          mInd  = j
        } else {
          this.numberArray[j].state = ElementStates.Default
        }
        this.animationFunctions.resultFunc([...this.numberArray])
        await this.delay()
      }
      this.swap(this.numberArray, i, mInd)
      this.numberArray[i].state = ElementStates.Modified
      if (i !== mInd) {
        this.numberArray[mInd].state = ElementStates.Default
      }
      this.animationFunctions.resultFunc([...this.numberArray])
      await this.delay()
    }
  }

  animate = async () => {
    this.setLoading(true)
    if (!this.numberArray || this.numberArray.length <= 0) {
      this.setLoading(false)
      return
    }
    if (this.method === SortMethod.Bubble) {
      await this.bubbleSort()
    }
    if (this.method === SortMethod.Selection) {
      await this.selectionSort()
    }
    this.setLoading(false)
  }
}
