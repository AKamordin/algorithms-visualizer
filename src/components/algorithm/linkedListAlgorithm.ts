import {AbstractAlgorithm} from "./abstractAlgorithm";
import {AnimationFunctions, ElementStates, ICircleElement} from "../../types";
import {DELAY_IN_MS} from "../../constants";
import {ILinkedList, LinkedList} from "../../types/linkedList";

export class LinkedListAlgorithm extends AbstractAlgorithm {

  list: ILinkedList <ICircleElement>;

  constructor(animationFunctions: AnimationFunctions, pause: number = DELAY_IN_MS) {
    super(animationFunctions, pause)
    this.list = new LinkedList()
  }

  processAfter = async (value: string | undefined, direction: "head" | "tail") => {
    const newArray = this.list.toArray()
    if (newArray.length === 0) {
      this.animationFunctions.resultFunc([])
      return
    }
    newArray[direction === "tail" ? newArray.length - 1 : 0] = {
      value: value,
      state: ElementStates.Modified
    }
    this.animationFunctions.resultFunc([...newArray])
    await this.delay()
    newArray[direction === "tail" ? newArray.length - 1 : 0].state = ElementStates.Default
    this.animationFunctions.resultFunc([...newArray])
    await this.delay()
  }

  animateInit = async (values: string[]) => {
    this.setLoading(true)
    for (const val of values) {
      const value: ICircleElement = {
        value: val,
        state: ElementStates.Default,
      };
      await this.addTail(value)
    }
    this.setLoading(false)
  }

  addHead = async (value: ICircleElement) => {
    const currentLength = this.list.getLength()
    const array = this.list.toArray()
    array[0] = {
      value: currentLength === 0 ? '' : array[0].value,
      state: ElementStates.Default,
      extraCircle: {
        value: value.value,
        state: ElementStates.Changing,
      }
    }
    this.animationFunctions.resultFunc([...array])
    await this.delay()
    this.list.prepend({
      value: value.value,
      state: ElementStates.Default
    })
    await this.processAfter(value.value, "head")
  }

  animateAddHead = async (value: ICircleElement) => {
    this.setLoading(true)
    await this.addHead(value)
    this.setLoading(false)
  }

  addTail = async (value: ICircleElement) => {
    const array = this.list.toArray()
    array[array.length === 0 ? 0 : array.length - 1] = {
      value: array.length === 0 ? '' : array[array.length - 1].value,
      state: ElementStates.Default,
      extraCircle: {
        value: value.value,
        state: ElementStates.Changing,
      }
    }
    this.animationFunctions.resultFunc([...array])
    await this.delay()
    this.list.append({
      value: value.value,
      state: ElementStates.Default
    });
    await this.processAfter(value.value, "tail")
  }

  animateAddTail = async (value: ICircleElement) => {
    this.setLoading(true)
    await this.addTail(value)
    this.setLoading(false)
  }

  animateDelHead = async () => {
    this.setLoading(true)
    const array = this.list.toArray();
    const value = array[0].value;
    array[0] = {
      value: '',
      state: ElementStates.Default,
      extraCircle: {
        value: value,
        state: ElementStates.Changing,
      }
    }
    this.animationFunctions.resultFunc([...array])
    await this.delay()
    this.list.deleteHead()
    await this.processAfter(value, "head")
    this.setLoading(false)
  }

  animateDelTail = async () => {
    this.setLoading(true)
    const array = this.list.toArray();
    const value = array[array.length - 1].value;
    array[array.length - 1] = {
      value: '',
      state: ElementStates.Default,
      extraCircle: {
        value: value,
        state: ElementStates.Changing,
      }
    }
    this.animationFunctions.resultFunc([...array])
    await this.delay()
    this.list.deleteTail()
    await this.processAfter(value, "tail")
    this.setLoading(false)
  }

}
