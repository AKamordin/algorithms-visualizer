export interface ILinkedList<T> {
  prepend: (element: T) => void;
  append: (element: T) => void;
  deleteHead: () => T | null;
  deleteTail: () => T | null;
  insertAt:(index: number, element: T) => void;
  deleteAt:(index: number) => void;
  getLength:() => number;
  toArray: () => T[];
  fromArray: (elements: T[]) => void;
  print: () => void;
}
