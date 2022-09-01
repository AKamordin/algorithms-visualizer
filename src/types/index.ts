import React from "react";

export enum SortMethod {
  Bubble = "bubble",
  Selection = "selection",
}

export enum Direction {
  Ascending = "ascending",
  Descending = "descending",
}

export enum ElementStates {
  Default = "default",
  Changing = "changing",
  Modified = "modified",
}

export enum StackAction {
  Add = "add",
  Del = "del",
}

export enum QueueAction {
  Add = "add",
  Del = "del",
}

export enum ListAction {
  AddToHead   = "addToHead",
  AddToTail   = "addToTail",
  DelFromHead = "delFromHead",
  DelFromTail = "delFromTail",
  AddByIndex  = "addByIndex",
  DelByIndex  = "delByIndex",
}


export interface IElement {
  value: string | undefined;
  state: ElementStates;
}

export interface ICircleElement extends IElement {
  tail?: string;
  head?: string;
  extraCircle?: IElement;
}

export interface AnimationFunctions {
  loadingFunc: React.Dispatch<React.SetStateAction<boolean>>
  resultFunc : React.Dispatch<React.SetStateAction<IElement[]>>
}
