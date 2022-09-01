import {IQueue} from "../../types/queue";

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = -1;
  private tail = -1;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    this.tail = (this.tail + 1) % this.size
    if (this.length === 0) {
      this.head = this.tail
    }
    this.container[this.tail] = item
    this.length++
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    const val = this.container[this.head]
    this.container[this.head] = null
    this.head = (this.head + 1) % this.size
    this.length--
    return val
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.container[this.head];
  };

  isEmpty = () => this.length === 0;

  clear = () => {
    this.container = Array(this.size);
    this.head = -1
    this.tail = -1
    this.length = 0
  }

  getArray = () => this.container;

  getHeadIndex = () => Math.max(this.head, 0);

  getTailIndex = () => Math.max(this.tail, 0);

}
