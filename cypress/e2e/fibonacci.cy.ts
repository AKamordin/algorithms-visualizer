import {
  circleSelector,
  defaultColor,
  inputSelector,
  submitSelector
} from "../support/e2e";
import {DELAY_IN_MS} from "../../src/constants";

describe('Фибоначчи', () => {

  beforeEach(() => {
    cy.visit('/fibonacci')
  })

  it('Если значение пустое, то кнопка добавления недоступна', () => {
    cy.get(inputSelector).clear()
    cy.get(submitSelector).should('be.disabled')
  })

  it('Числа генерируются корректно', () => {
    const number = 5
    let cIndex = 0
    let mIndex = number
    // Iterate function
    const iterate = (cIndex, mIndex, value: Array<number>) => {
      cy.get(circleSelector).then(cs => {
        if (cIndex <= mIndex) {
          if (cIndex === 0 || cIndex === 1) {
            value[cIndex] = 1
          } else {
            value[cIndex] = value[cIndex - 1] + value[cIndex - 2]
          }
          for (let i = 0; i <= cIndex; i++) {
            cy.wrap(cs).eq(i).should('have.text', value[i])
            cy.wrap(cs).eq(i).should('have.css', 'border-color', defaultColor)
          }
          cy.wait(DELAY_IN_MS)
          iterate(cIndex + 1, mIndex, value)
        }
      })
    }
    // Set value
    cy.get(inputSelector).type(number.toString())
    // Run
    cy.get(submitSelector).click()
    iterate(cIndex, mIndex, [])
  })

})
