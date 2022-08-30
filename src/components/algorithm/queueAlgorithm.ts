import {AbstractAlgorithm} from "./abstractAlgorithm";
import {AnimationFunctions, ElementStates, ICircleElement} from "../../types";
import {DELAY_IN_MS, HEAD, QUEUE_MAX_SIZE, TAIL} from "../../constants";
import {Queue} from "../../types/queue";

export class QueueAlgorithm extends AbstractAlgorithm {

  queue: Queue<ICircleElement>;

  constructor(animationFunctions: AnimationFunctions, pause: number = DELAY_IN_MS) {
    super(animationFunctions, pause)
    this.queue = new Queue(QUEUE_MAX_SIZE)
  }

  animateEnqueue = async (value: ICircleElement) => {
    this.setLoading(true)
    this.queue.enqueue(value)
    const array: ICircleElement[] = this.queue.getArray().map(el => el ? el : ({value: '', state: ElementStates.Default}))
    const head = this.queue.getHeadIndex()
    const tail = this.queue.getTailIndex()
    array[head].head = HEAD
    array[tail].tail = TAIL
    const prevTailIndex = tail > 0 ? tail - 1 : QUEUE_MAX_SIZE - 1
    if (array[prevTailIndex]) {
      array[prevTailIndex].tail = undefined
    }
    this.animationFunctions.resultFunc([...array])
    await this.delay()
    array[head].state = ElementStates.Default
    array[tail].state = ElementStates.Default
    this.animationFunctions.resultFunc([...array])
    await this.delay()
    this.setLoading(false)
  }

  animateDequeue = async () => {
    this.setLoading(true)
    const array: ICircleElement[] = this.queue.getArray().map(el => el ? el : ({value: '', state: ElementStates.Default}))
    const prevHead = this.queue.getHeadIndex()
    array[prevHead].state = ElementStates.Changing
    this.animationFunctions.resultFunc([...array])
    await this.delay()
    this.queue.dequeue()
    const head = this.queue.getHeadIndex()
    const newArray: ICircleElement[] = this.queue.getArray().map(el => el ? el : ({value: '', state: ElementStates.Default}))
    const prevHeadIndex = head > 0 ? head - 1 : QUEUE_MAX_SIZE - 1
    newArray[prevHeadIndex].head = undefined
    newArray[prevHeadIndex].state = ElementStates.Default
    if (!this.queue.isEmpty()) {
      newArray[head].head = HEAD
      array[head].state = ElementStates.Default
    }
    this.animationFunctions.resultFunc([...newArray])
    this.setLoading(false)
  }

  animateClear = () => {
    this.queue.clear();
    const newArray: ICircleElement[] = Array.from({length: QUEUE_MAX_SIZE}, () => ({value: '', state: ElementStates.Default}))
    this.animationFunctions.resultFunc([...newArray])
  }
}
