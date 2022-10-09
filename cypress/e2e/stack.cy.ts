import {
  addButtonSelector,
  changingColor,
  circleContentSelector,
  circleHeadSelector,
  circleIndexSelector,
  circleSelector,
  clrButtonSelector,
  defaultColor,
  delButtonSelector,
  inputSelector
} from "../support/e2e";
import {SHORT_DELAY_IN_MS} from "../../src/constants";

describe('Стек', () => {

  beforeEach(() => {
    cy.visit('/stack')
  })

  it('Если значение пустое, то кнопка добавления недоступна', () => {
    cy.get(inputSelector).clear()
    cy.get(addButtonSelector).should('be.disabled')
  })

  it('Правильность добавления элемента в стек', () => {
    cy.get(inputSelector).type('X')
    cy.get(addButtonSelector).click()
    //
    cy.get(circleContentSelector).then(cs => {
      cy.wrap(cs).should('have.length', 1)
      cy.wrap(cs).eq(0).find(circleSelector).should('have.text', 'X')
      cy.wrap(cs).eq(0).find(circleHeadSelector).should('have.text', 'top')
      cy.wrap(cs).eq(0).find(circleIndexSelector).should('have.text', '0')
      cy.wrap(cs).eq(0).find(circleSelector).should('have.css', 'border-color', changingColor)
      cy.wait(SHORT_DELAY_IN_MS)
      cy.wrap(cs).eq(0).find(circleSelector).should('have.css', 'border-color', defaultColor)
    })
    //
    cy.get(inputSelector).type('Y')
    cy.get(addButtonSelector).click()
    cy.get(circleContentSelector).then(cs => {
      cy.wrap(cs).should('have.length', 2)
      // 0
      cy.wrap(cs).eq(0).find(circleSelector).should('have.css', 'border-color', defaultColor)
      cy.wrap(cs).eq(0).find(circleSelector).should('have.text', 'X')
      cy.wrap(cs).eq(0).find(circleHeadSelector).should('have.text', '')
      cy.wrap(cs).eq(0).find(circleIndexSelector).should('have.text', '0')
      // 1
      cy.wrap(cs).eq(1).find(circleSelector).should('have.text', 'Y')
      cy.wrap(cs).eq(1).find(circleHeadSelector).should('have.text', 'top')
      cy.wrap(cs).eq(1).find(circleIndexSelector).should('have.text', '1')
      cy.wrap(cs).eq(1).find(circleSelector).should('have.css', 'border-color', changingColor)
      cy.wait(SHORT_DELAY_IN_MS)
      cy.wrap(cs).eq(1).find(circleSelector).should('have.css', 'border-color', defaultColor)
    })
  })

  it('Правильность удаления элемента из стека', () => {
    cy.get(inputSelector).type('X')
    cy.get(addButtonSelector).click()
    cy.wait(SHORT_DELAY_IN_MS)
    cy.get(inputSelector).type('Y')
    cy.get(addButtonSelector).click()
    cy.wait(SHORT_DELAY_IN_MS)
    cy.get(delButtonSelector).click()
    cy.get(circleContentSelector).then(cs => {
      cy.wrap(cs).should('have.length', 2)
      cy.wrap(cs).eq(1).find(circleSelector).should('have.text', 'Y')
      cy.wrap(cs).eq(1).find(circleHeadSelector).should('have.text', 'top')
      cy.wrap(cs).eq(1).find(circleIndexSelector).should('have.text', '1')
      cy.wrap(cs).eq(1).find(circleSelector).should('have.css', 'border-color', changingColor)
    })
    cy.wait(SHORT_DELAY_IN_MS)
    cy.get(circleContentSelector).then(cs => {
      cy.wrap(cs).should('have.length', 1)
      cy.wrap(cs).eq(0).find(circleSelector).should('have.text', 'X')
      cy.wrap(cs).eq(0).find(circleHeadSelector).should('have.text', 'top')
      cy.wrap(cs).eq(0).find(circleIndexSelector).should('have.text', '0')
      cy.wrap(cs).eq(0).find(circleSelector).should('have.css', 'border-color', defaultColor)
    })
  })

  it('Правильность поведения кнопки "Очистить"', () => {
    cy.get(inputSelector).type('X')
    cy.get(addButtonSelector).click()
    cy.wait(SHORT_DELAY_IN_MS)
    cy.get(inputSelector).type('Y')
    cy.get(addButtonSelector).click()
    cy.wait(SHORT_DELAY_IN_MS)
    cy.get(inputSelector).type('Z')
    cy.get(addButtonSelector).click()
    cy.wait(SHORT_DELAY_IN_MS)
    cy.get(clrButtonSelector).click()
    cy.get(circleContentSelector).should('have.length', 0)
    cy.get(addButtonSelector).should('be.disabled')
    cy.get(delButtonSelector).should('be.disabled')
    cy.get(clrButtonSelector).should('be.disabled')
  })

})
