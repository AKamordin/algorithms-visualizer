import {AbstractAlgorithm} from "./abstractAlgorithm";
import {AnimationFunctions, ElementStates, ICircleElement} from "../../types";
import {
  DELAY_IN_MS,
  LIST_INIT_ARRAY_SIZE,
  LIST_INIT_MAX_VALUE,
  LIST_INIT_MIN_VALUE,
} from "../../constants";
import {LinkedList} from "./linkedList";
import {ILinkedList} from "../../types/linkedList";
import {generateRandomArray} from "../../utils";

export class LinkedListAlgorithm extends AbstractAlgorithm {

  list: ILinkedList <ICircleElement>;

  constructor(animationFunctions: AnimationFunctions, pause: number = DELAY_IN_MS) {
    super(animationFunctions, pause)
    this.list = new LinkedList()
  }

  processAfter = async (value: string | undefined, position: "head" | "tail" | "index", index: number | undefined = undefined) => {
    const newArray = this.list.toArray()
    if (newArray.length === 0) {
      this.animationFunctions.resultFunc([])
      return
    }
    const dir = position === "tail" ? newArray.length - 1 : 0
    newArray[index ? index : dir] = {
      value: value,
      state: ElementStates.Modified
    }
    this.animationFunctions.resultFunc([...newArray])
    await this.delay()
    if (index) {
      for (let i = 0; i < index; i++) {
        newArray[i].state = ElementStates.Default
        newArray[i].extraCircle = undefined
      }
    }
    newArray[index ? index : dir].state = ElementStates.Default
    newArray[index ? index : dir].extraCircle = undefined
    this.animationFunctions.resultFunc([...newArray])
    await this.delay()
  }

  init = () => {
    const array = generateRandomArray(LIST_INIT_ARRAY_SIZE, LIST_INIT_MIN_VALUE, LIST_INIT_MAX_VALUE)
    this.list.fromArray(array)
    this.animationFunctions.resultFunc([...array])
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
    array.push({
      value: '',
      state: ElementStates.Default,
      extraCircle: {
        value: value.value,
        state: ElementStates.Changing,
      }
    })
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

  delHead = async () => {
    const array = this.list.toArray()
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
    const newArray = this.list.toArray();
    this.animationFunctions.resultFunc([...newArray])
    await this.delay()
  }

  animateDelHead = async () => {
    this.setLoading(true)
    await this.delHead()
    this.setLoading(false)
  }

  delTail = async () => {
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
    const newArray = this.list.toArray();
    this.animationFunctions.resultFunc([...newArray])
    await this.delay()
  }

  animateDelTail = async () => {
    this.setLoading(true)
    await this.delTail()
    this.setLoading(false)
  }

  animateAddByIndex = async (index: number, value: ICircleElement) => {
    this.setLoading(true)
    if (index === 0) {
      await this.addHead(value)
    } else {
      const array = this.list.toArray();
      let idx = 0
      while (idx < index) {
        array[idx].state = ElementStates.Changing
        this.animationFunctions.resultFunc([...array])
        await this.delay()
        idx++
      }
      const insertedValue = {
        value: '',
        state: ElementStates.Default,
        extraCircle: {
          value: value.value,
          state: ElementStates.Changing,
        }
      }
      array.splice(idx, 0, insertedValue)
      this.animationFunctions.resultFunc([...array])
      await this.delay()
      this.list.insertAt(idx, {
        value: value.value,
        state: ElementStates.Default
      })
      await this.processAfter(value.value, "index", idx)
    }
    this.setLoading(false)
  }

  animateDelByIndex = async (index: number) => {
    this.setLoading(true)
    if (index === 0) {
      await this.delHead()
    } else {
      const array = this.list.toArray();
      let idx = 0
      while (idx < index) {
        array[idx].state = ElementStates.Changing
        array[idx].extraCircle = undefined
        this.animationFunctions.resultFunc([...array])
        await this.delay()
        idx++
      }
      const oldVal = array[idx].value
      array[idx] = {
        value: '',
        state: ElementStates.Default,
        extraCircle: {
          value: oldVal,
          state: ElementStates.Changing,
        }
      }
      this.animationFunctions.resultFunc([...array])
      await this.delay()
      this.list.deleteAt(idx)
      const newArray = this.list.toArray();
      for (let i = 0; i < index; i++) {
        newArray[i].state = ElementStates.Default
        newArray[i].extraCircle = undefined
      }
      this.animationFunctions.resultFunc([...newArray])
      await this.delay()
    }
    this.setLoading(false)
  }

}
