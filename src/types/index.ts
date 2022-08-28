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

export interface IElement {
  value: string | undefined;
  state: ElementStates;
}

export interface ICircleElement extends IElement {
  arrow?: boolean;
  tail?: string;
  head?: string;
  extraCircle?: IElement;
}

export interface AnimationFunctions {
  loadingFunc: React.Dispatch<React.SetStateAction<boolean>>
  resultFunc : React.Dispatch<React.SetStateAction<IElement[]>>
}
