import {
  addButtonSelector, changingColor,
  circleContentSelector,
  circleHeadSelector, circleIndexSelector,
  circleSelector, circleTailSelector, clrButtonSelector, defaultColor, delButtonSelector,
  inputSelector
} from "../support/e2e";
import {QUEUE_MAX_SIZE, SHORT_DELAY_IN_MS} from "../../src/constants";

describe('Очередь', () => {

  beforeEach(() => {
    cy.visit('/queue')
  })

  it('Если значение пустое, то кнопка добавления недоступна', () => {
    cy.get(inputSelector).clear()
    cy.get(addButtonSelector).should('be.disabled')
  })

  it('Правильность добавления элемента в очередь', () => {
    cy.get(inputSelector).type('X')
    cy.get(addButtonSelector).click()
    //
    cy.get(circleContentSelector).then(cs => {
      cy.wrap(cs).should('have.length', QUEUE_MAX_SIZE)
      for (let i = 0; i < QUEUE_MAX_SIZE; i++) {
        cy.wrap(cs).eq(i).find(circleSelector).should('have.text', i === 0 ? 'X' : '')
        cy.wrap(cs).eq(i).find(circleHeadSelector).should('have.text', i === 0 ? 'head' : '')
        cy.wrap(cs).eq(i).find(circleTailSelector).should('have.text', i === 0 ? 'tail' : '')
        cy.wrap(cs).eq(i).find(circleIndexSelector).should('have.text', i.toString())
        cy.wrap(cs).eq(i).find(circleSelector).should('have.css', 'border-color', i === 0 ? changingColor : defaultColor)
      }
      cy.wait(SHORT_DELAY_IN_MS)
      cy.wrap(cs).eq(0).find(circleSelector).should('have.css', 'border-color', defaultColor)
    })
    //
    cy.get(inputSelector).type('Y')
    cy.get(addButtonSelector).click()
    //
    cy.get(circleContentSelector).then(cs => {
      cy.wrap(cs).should('have.length', QUEUE_MAX_SIZE)
      for (let i = 0; i < QUEUE_MAX_SIZE; i++) {
        if (i === 0) {
          cy.wrap(cs).eq(i).find(circleSelector).should('have.text', 'X')
          cy.wrap(cs).eq(i).find(circleHeadSelector).should('have.text', 'head')
          cy.wrap(cs).eq(i).find(circleTailSelector).should('have.text', '')
        }
        if (i === 1) {
          cy.wrap(cs).eq(i).find(circleSelector).should('have.text', 'Y')
          cy.wrap(cs).eq(i).find(circleHeadSelector).should('have.text', '')
          cy.wrap(cs).eq(i).find(circleTailSelector).should('have.text', 'tail')
        }
        cy.wrap(cs).eq(i).find(circleIndexSelector).should('have.text', i.toString())
        cy.wrap(cs).eq(i).find(circleSelector).should('have.css', 'border-color', i === 1 ? changingColor : defaultColor)
      }
      cy.wait(SHORT_DELAY_IN_MS)
      cy.wrap(cs).eq(1).find(circleSelector).should('have.css', 'border-color', defaultColor)
    })
  })

  it('Правильность удаления элемента из очереди', () => {
    cy.get(inputSelector).type('X')
    cy.get(addButtonSelector).click()
    cy.wait(SHORT_DELAY_IN_MS)
    cy.get(inputSelector).type('Y')
    cy.get(addButtonSelector).click()
    cy.wait(SHORT_DELAY_IN_MS)
    cy.get(delButtonSelector).click()
    cy.get(circleContentSelector).then(cs => {
      cy.wrap(cs).should('have.length', QUEUE_MAX_SIZE)
      for (let i = 0; i < QUEUE_MAX_SIZE; i++) {
        if (i === 0) {
          cy.wrap(cs).eq(i).find(circleSelector).should('have.text', 'X')
          cy.wrap(cs).eq(i).find(circleHeadSelector).should('have.text', 'head')
          cy.wrap(cs).eq(i).find(circleTailSelector).should('have.text', '')
        }
        if (i === 1) {
          cy.wrap(cs).eq(i).find(circleSelector).should('have.text', 'Y')
          cy.wrap(cs).eq(i).find(circleHeadSelector).should('have.text', '')
          cy.wrap(cs).eq(i).find(circleTailSelector).should('have.text', 'tail')
        }
        cy.wrap(cs).eq(i).find(circleIndexSelector).should('have.text', i.toString())
        cy.wrap(cs).eq(i).find(circleSelector).should('have.css', 'border-color', i === 0 ? changingColor : defaultColor)
      }
      cy.wait(SHORT_DELAY_IN_MS)
      for (let i = 0; i < QUEUE_MAX_SIZE; i++) {
        if (i === 0) {
          cy.wrap(cs).eq(i).find(circleSelector).should('have.text', '')
          cy.wrap(cs).eq(i).find(circleHeadSelector).should('have.text', '')
          cy.wrap(cs).eq(i).find(circleTailSelector).should('have.text', '')
        }
        if (i === 1) {
          cy.wrap(cs).eq(i).find(circleSelector).should('have.text', 'Y')
          cy.wrap(cs).eq(i).find(circleHeadSelector).should('have.text', 'head')
          cy.wrap(cs).eq(i).find(circleTailSelector).should('have.text', 'tail')
        }
        cy.wrap(cs).eq(i).find(circleIndexSelector).should('have.text', i.toString())
        cy.wrap(cs).eq(i).find(circleSelector).should('have.css', 'border-color', defaultColor)
      }
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
    cy.get(circleContentSelector).then(cs => {
      cy.wrap(cs).should('have.length', QUEUE_MAX_SIZE)
      for (let i = 0; i < QUEUE_MAX_SIZE; i++) {
        cy.wrap(cs).eq(i).find(circleSelector).should('have.text', '')
        cy.wrap(cs).eq(i).find(circleHeadSelector).should('have.text', '')
        cy.wrap(cs).eq(i).find(circleTailSelector).should('have.text', '')
        cy.wrap(cs).eq(i).find(circleIndexSelector).should('have.text', i.toString())
        cy.wrap(cs).eq(i).find(circleSelector).should('have.css', 'border-color', defaultColor)
      }
    })
    cy.get(addButtonSelector).should('be.disabled')
    cy.get(delButtonSelector).should('be.disabled')
    cy.get(clrButtonSelector).should('be.disabled')
  })

})
