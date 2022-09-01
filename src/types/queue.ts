export interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
  getArray: () => (T |null)[];
  getHeadIndex: () => number;
  getTailIndex: () => number;
}
