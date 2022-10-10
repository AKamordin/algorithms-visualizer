import {DELAY_IN_MS} from "../../src/constants";
import {
  changingColor,
  circleSelector,
  defaultColor,
  inputSelector,
  modifiedColor,
  submitSelector
} from "../support/e2e";

describe('Строка', () => {

  beforeEach(() => {
    cy.visit('/recursion')
  })

  it('Если значение пустое, то кнопка добавления недоступна', () => {
    cy.get(inputSelector).clear()
    cy.get(submitSelector).should('be.disabled')
  })

  it('Строка разворачивается корректно', () => {
    const initStr = 'HELLO'
    const doneStr = 'OLLEH'
    let lIndex = 0
    let hIndex = initStr.length - 1
    // Iterate function
    const iterate = (lIndex, hIndex) => {
      cy.get(circleSelector).then(cs => {
        if (lIndex <= hIndex) {
          cy.wrap(cs).eq(lIndex).should('have.css', 'border-color', changingColor)
          cy.wrap(cs).eq(hIndex).should('have.css', 'border-color', changingColor)
          cy.wait(DELAY_IN_MS)
          cy.wrap(cs).eq(lIndex).should('have.text', doneStr[lIndex])
          cy.wrap(cs).eq(hIndex).should('have.text', doneStr[hIndex])
          cy.wrap(cs).eq(lIndex).should('have.css', 'border-color', modifiedColor)
          cy.wrap(cs).eq(hIndex).should('have.css', 'border-color', modifiedColor)
          cy.wait(DELAY_IN_MS)
          iterate(lIndex + 1, hIndex - 1)
        }
      })
    }
    // Set value
    cy.get(inputSelector).type(initStr)
    // Initial state
    cy.get(circleSelector).should('have.length', initStr.length)
      .each((item, index) => {
        expect(item.text()).to.eq(initStr[index])
        cy.wrap(item).should('have.css', 'border-color', defaultColor)
      })
    // Run
    cy.get(submitSelector).click()
    iterate(lIndex, hIndex)
    // Check disabled
    cy.get(submitSelector).should('be.disabled')
  })

})
