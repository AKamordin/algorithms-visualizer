// ***********************************************************
// This example support/integration.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

export const inputSelector = 'Input'
export const inputValueSelector = '[data-cy="valueInput"]'
export const inputIndexSelector = '[data-cy="indexInput"]'
export const submitSelector = 'Button[type="submit"]'
export const addButtonSelector = '[data-cy="addButton"]'
export const addHeadButtonSelector = '[data-cy="addHeadButton"]'
export const addTailButtonSelector = '[data-cy="addTailButton"]'
export const addByIndexButtonSelector = '[data-cy="addByIndexButton"]'
export const delButtonSelector = '[data-cy="delButton"]'
export const delHeadButtonSelector = '[data-cy="delHeadButton"]'
export const delTailButtonSelector = '[data-cy="delTailButton"]'
export const delByIndexButtonSelector = '[data-cy="delByIndexButton"]'
export const clrButtonSelector = '[data-cy="clrButton"]'
export const circleSelector = '[class*=circle_circle]'
export const circleContentSelector = '[class*=circle_content]'
export const circleSmallTopSelector = '[class*=pages_topCircle]'
export const circleSmallBottomSelector = '[class*=pages_bottomCircle]'
export const circleSmallSelector = '[class*=circle_small]'
export const circleHeadSelector = '[class*=circle_head]'
export const circleTailSelector = '[class*=circle_tail]'
export const circleIndexSelector = '[class*=circle_index]'
export const listItemSelector = '[class*=pages_listItemContainer]'
export const defaultColor = 'rgb(0, 50, 255)'
export const changingColor = 'rgb(210, 82, 225)'
export const modifiedColor = 'rgb(127, 224, 81)'

// Alternatively you can use CommonJS syntax:
// require('./commands')
