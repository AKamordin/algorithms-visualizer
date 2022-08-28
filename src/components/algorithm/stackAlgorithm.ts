import {AbstractAlgorithm} from "./abstractAlgorithm";
import {AnimationFunctions, ElementStates, ICircleElement} from "../../types";
import {DELAY_IN_MS, TOP} from "../../constants";
import {IStack, Stack} from "../../types/stack";

export class StackAlgorithm extends AbstractAlgorithm {

  stack: IStack<ICircleElement>;

  constructor(animationFunctions: AnimationFunctions, pause: number = DELAY_IN_MS) {
    super(animationFunctions, pause)
    this.stack = new Stack()
  }

  animatePush = async (value: ICircleElement) => {
    this.setLoading(true)
    this.stack.push(value)
    const array: ICircleElement[] = this.stack.getArray()
    if (array.length > 1) {
      array[array.length - 2].head = undefined
    }
    array[array.length - 1].head = TOP
    this.animationFunctions.resultFunc([...array])
    await this.delay()
    array[array.length - 1].state = ElementStates.Default
    this.animationFunctions.resultFunc([...array])
    await this.delay()
    this.setLoading(false)
  }

  animatePop = async () => {
    this.setLoading(true)
    const array: ICircleElement[] = this.stack.getArray()
    array[array.length - 1].state = ElementStates.Changing
    this.animationFunctions.resultFunc([...array])
    await this.delay()
    this.stack.pop()
    const newArray: ICircleElement[] = this.stack.getArray()
    if (newArray.length > 0) {
      newArray[newArray.length - 1].head = TOP
      this.animationFunctions.resultFunc([...newArray])
    } else {
      this.animationFunctions.resultFunc([])
    }
    this.setLoading(false)
  }

  animateClear = () => {
    this.stack.clear();
    this.animationFunctions.resultFunc([])
  }
}
