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

export interface IElement {
  value: string | undefined;
  state: ElementStates;
}

export interface ICircleElement extends IElement {
  adding?: boolean;
  deleting?: boolean;
  arrow?: boolean;
  tail?: string;
  head?: string;
  extraCircle?: IElement;
}

export interface AnimationFunctions {
  loadingFunc: React.Dispatch<React.SetStateAction<boolean>>
  resultFunc : React.Dispatch<React.SetStateAction<IElement[]>>
}
