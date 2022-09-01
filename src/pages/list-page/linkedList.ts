import {ILinkedList} from "../../types/linkedList";

export class LinkedListNode<T> {
  value: T
  next: LinkedListNode<T> | null
  constructor(value: T, next?: LinkedListNode<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: LinkedListNode<T> | null
  private tail: LinkedListNode<T> | null
  private length: number
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  toArray = (): T[] => {
    const nodes = []
    let curr = this.head
    while (curr) {
      nodes.push(curr.value)
      curr = curr.next
    }
    return nodes
  }

  fromArray = (elements: T[]): void => {
    elements.forEach(value => this.append(value))
  }

  getLength = (): number => {
    return this.length
  }

  prepend = (element: T) => {
    const node = new LinkedListNode(element, this.head)
    this.head = node
    if (!this.tail) {
      this.tail = node
    }
    this.length++
  }

  append = (element: T) => {
    const node = new LinkedListNode(element)
    let tmpHead = this.head
    let tmpTail = this.tail
    if (!tmpHead || !tmpTail) {
      this.head = node
      this.tail = node
    } else {
      if (this.tail) {
        this.tail.next = node
      }
      this.tail = node
    }
    this.length++
  }

  insertAt = (index: number, element: T): void => {
    if (index >= this.length) {
      throw new Error("Insert index out of bounds")
    }
    if (index === 0) {
      this.prepend(element)
    } else {
      let prev = null
      let curr = this.head
      for (let i = 0; i < index; i++) {
        prev = curr
        if (curr) {
          curr = curr.next
        }
      }
      const node = new LinkedListNode(element)
      node.next = curr
      if (prev) {
        prev.next = node
      }
      this.length++
    }
  }

  deleteHead = (): T | null => {
    if (!this.head) {
      return null
    }
    const deletedHead = this.head
    if (this.head.next) {
      this.head = this.head.next
    } else {
      this.head = null
      this.tail = null
    }
    this.length--
    return deletedHead.value
  }

  deleteTail = (): T | null => {
    if (!this.tail) {
      return null
    }
    const deletedTail = this.tail
    this.length--
    if (this.head === this.tail) {
      this.head = null
      this.tail = null
      return deletedTail.value
    }
    let curr = this.head
    while (curr && curr.next) {
      if (!curr.next.next) {
        curr.next = null
      } else {
        curr = curr.next
      }
    }
    this.tail = curr
    return deletedTail.value
  }

  deleteAt = (index: number): void => {
    if (index >= this.length) {
      throw new Error("Remove index out of bounds")
    }
    if (index === 0) {
      this.deleteHead()
    } else {
      let prev = null
      let curr = this.head
      for (let i = 0; i < index; i++) {
        prev = curr
        if (curr) {
          curr = curr.next
        }
      }
      if (prev) {
        prev.next = curr ? curr.next : null
      }
      this.length--
    }
  }

  print() {
    let curr = this.head
    let res = ''
    while (curr) {
      res += `${curr.value} `
      curr = curr.next
    }
    console.log(res)
  }
}
