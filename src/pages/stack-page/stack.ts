import {IStack} from "../../types/stack";

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    this.container.pop();
  };

  peak = (): T | null => {
    if (this.container.length !== 0) {
      return this.container[this.container.length - 1];
    }
    return null;
  };

  getSize = () => this.container.length;

  clear = () => (this.container.length = 0);

  getArray = () => this.container;
}
