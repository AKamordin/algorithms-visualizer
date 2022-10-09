import {
  addByIndexButtonSelector,
  addHeadButtonSelector,
  addTailButtonSelector, changingColor, circleContentSelector, circleHeadSelector, circleIndexSelector,
  circleSelector, circleSmallBottomSelector, circleSmallTopSelector, circleTailSelector, defaultColor,
  delByIndexButtonSelector,
  delHeadButtonSelector,
  delTailButtonSelector,
  inputIndexSelector,
  inputValueSelector, listItemSelector, modifiedColor
} from "../support/e2e";
import {LIST_INIT_ARRAY_SIZE, SHORT_DELAY_IN_MS} from "../../src/constants";

describe('Список', () => {

  beforeEach(() => {
    cy.visit('/list')
  })

  it('Если значения пустые, то кнопки добавления недоступны', () => {
    cy.get(inputValueSelector).clear()
    cy.get(addHeadButtonSelector).should('be.disabled')
    cy.get(addTailButtonSelector).should('be.disabled')
    cy.get(delHeadButtonSelector).should('not.be.disabled')
    cy.get(delTailButtonSelector).should('not.be.disabled')
    cy.get(inputIndexSelector).clear()
    cy.get(addByIndexButtonSelector).should('be.disabled')
    cy.get(delByIndexButtonSelector).should('be.disabled')
  })

  it('Отрисовка дефолтного списка', () => {
    cy.wait(SHORT_DELAY_IN_MS)
    cy.get(circleContentSelector).should('have.length', LIST_INIT_ARRAY_SIZE)
      .each((item, index) => {
        cy.wrap(item).find(circleSelector).should('not.have.text', '')
        cy.wrap(item).find(circleSelector).should('have.css', 'border-color', defaultColor)
        if (index === 0) {
          cy.wrap(item).find(circleHeadSelector).should('have.text', 'head')
        }
        if (index === LIST_INIT_ARRAY_SIZE - 1) {
          cy.wrap(item).find(circleTailSelector).should('have.text', 'tail')
        }
      })
  })

  it('Добавление элемента в head', () => {
    cy.get(inputValueSelector).type('99')
    cy.get(addHeadButtonSelector).click()
    //
    cy.get(listItemSelector).then(cs => {
      cy.wrap(cs).should('have.length', LIST_INIT_ARRAY_SIZE)
      // Big circle
      cy.wrap(cs).eq(0).find(circleContentSelector).not(circleSmallTopSelector).find(circleSelector).should('not.have.text', '')
      cy.wrap(cs).eq(0).find(circleContentSelector).not(circleSmallTopSelector).find(circleIndexSelector).should('have.text', '0')
      // Small top circle has been appeared
      cy.wrap(cs).eq(0).find(circleContentSelector).get(circleSmallTopSelector).find(circleSelector).should('have.text', '99')
      cy.wrap(cs).eq(0).find(circleContentSelector).get(circleSmallTopSelector).find(circleSelector).should('have.css', 'border-color', changingColor)
    })
    cy.wait(SHORT_DELAY_IN_MS)
    cy.get(listItemSelector).then(cs => {
      cy.wrap(cs).should('have.length', LIST_INIT_ARRAY_SIZE + 1)
      // Small top circle has been disappeared
      cy.wrap(cs).eq(0).find(circleContentSelector).find(circleSmallTopSelector).should('have.length', 0)
      // Added big circle
      cy.wrap(cs).eq(0).find(circleContentSelector).find(circleSelector).should('have.text', '99')
      cy.wrap(cs).eq(0).find(circleContentSelector).find(circleHeadSelector).should('have.text', 'head')
      cy.wrap(cs).eq(0).find(circleContentSelector).find(circleIndexSelector).should('have.text', '0')
      cy.wrap(cs).eq(0).find(circleContentSelector).find(circleSelector).should('have.css', 'border-color', modifiedColor)
    })
    cy.wait(SHORT_DELAY_IN_MS)
    cy.get(circleContentSelector).eq(0).find(circleSelector).should('have.css', 'border-color', defaultColor)
  })

  it('Добавление элемента в tail', () => {
    cy.get(inputValueSelector).type('99')
    cy.get(addTailButtonSelector).click()
    //
    cy.get(listItemSelector).then(cs => {
      cy.wrap(cs).should('have.length', LIST_INIT_ARRAY_SIZE + 1)
      // Small top circle has been appeared
      cy.wrap(cs).eq(LIST_INIT_ARRAY_SIZE).find(circleContentSelector).get(circleSmallTopSelector).find(circleSelector).should('have.text', '99')
      cy.wrap(cs).eq(LIST_INIT_ARRAY_SIZE).find(circleContentSelector).get(circleSmallTopSelector).find(circleSelector).should('have.css', 'border-color', changingColor)
      // Big circle
      cy.wrap(cs).eq(LIST_INIT_ARRAY_SIZE).find(circleContentSelector).not(circleSmallTopSelector).find(circleSelector).should('have.text', '')
      cy.wrap(cs).eq(LIST_INIT_ARRAY_SIZE).find(circleContentSelector).not(circleSmallTopSelector).find(circleIndexSelector).should('have.text', LIST_INIT_ARRAY_SIZE.toString())
      //
      cy.wait(SHORT_DELAY_IN_MS)
      // Small top circle has been disappeared
      cy.wrap(cs).eq(LIST_INIT_ARRAY_SIZE).find(circleContentSelector).get(circleSmallTopSelector).should('have.length', 0)
      // Added big circle
      cy.wrap(cs).eq(LIST_INIT_ARRAY_SIZE).find(circleContentSelector).find(circleSelector).should('have.text', '99')
      cy.wrap(cs).eq(LIST_INIT_ARRAY_SIZE).find(circleContentSelector).find(circleTailSelector).should('have.text', 'tail')
      cy.wrap(cs).eq(LIST_INIT_ARRAY_SIZE).find(circleContentSelector).find(circleIndexSelector).should('have.text', LIST_INIT_ARRAY_SIZE.toString())
      cy.wrap(cs).eq(LIST_INIT_ARRAY_SIZE).find(circleContentSelector).find(circleSelector).should('have.css', 'border-color', modifiedColor)
    })
    cy.wait(SHORT_DELAY_IN_MS)
    cy.get(circleContentSelector).eq(LIST_INIT_ARRAY_SIZE).find(circleSelector).should('have.css', 'border-color', defaultColor)
  })

  // Iterate function
  const iterate = (lIndex, hIndex) => {
    cy.get(circleContentSelector).then(cs => {
      if (lIndex < hIndex) {
        cy.wrap(cs).find(circleSelector).eq(lIndex).should('have.css', 'border-color', changingColor)
        cy.wait(SHORT_DELAY_IN_MS)
        iterate(lIndex + 1, hIndex)
      }
    })
  }

  it('Добавление элемента по индексу  ', () => {
    const index = 3
    let lIndex = 0
    let hIndex = index
    cy.get(inputValueSelector).type('99')
    cy.get(inputIndexSelector).type(index.toString())
    cy.get(addByIndexButtonSelector).click()
    iterate(lIndex, hIndex)
    //
    cy.get(listItemSelector).then(cs => {
      cy.wrap(cs).should('have.length', LIST_INIT_ARRAY_SIZE + 1)
      // Big circle
      cy.wrap(cs).eq(index).find(circleContentSelector).not(circleSmallTopSelector).find(circleSelector).should('have.text', '')
      cy.wrap(cs).eq(index).find(circleContentSelector).not(circleSmallTopSelector).find(circleIndexSelector).should('have.text', index.toString())
      // Small top circle has been appeared
      cy.wrap(cs).eq(index).find(circleContentSelector).get(circleSmallTopSelector).find(circleSelector).should('have.text', '99')
      cy.wrap(cs).eq(index).find(circleContentSelector).get(circleSmallTopSelector).find(circleSelector).should('have.css', 'border-color', changingColor)
    })
    cy.wait(SHORT_DELAY_IN_MS)
    cy.get(listItemSelector).then(cs => {
      cy.wrap(cs).should('have.length', LIST_INIT_ARRAY_SIZE + 1)
      // Small top circle has been disappeared
      cy.wrap(cs).eq(index).find(circleContentSelector).find(circleSmallTopSelector).should('have.length', 0)
      // Added big circle
      cy.wrap(cs).eq(index).find(circleContentSelector).find(circleSelector).should('have.text', '99')
      cy.wrap(cs).eq(index).find(circleContentSelector).find(circleIndexSelector).should('have.text', index.toString())
      cy.wrap(cs).eq(index).find(circleContentSelector).find(circleSelector).should('have.css', 'border-color', modifiedColor)
    })
    cy.wait(SHORT_DELAY_IN_MS)
    cy.get(circleContentSelector).eq(index).find(circleSelector).should('have.css', 'border-color', defaultColor)
  })

  it('Удаление элемента из head', () => {
    cy.get(delHeadButtonSelector).click()
    cy.get(listItemSelector).then(cs => {
      cy.wrap(cs).should('have.length', LIST_INIT_ARRAY_SIZE)
      // Big circle
      cy.wrap(cs).eq(0).find(circleContentSelector).not(circleSmallBottomSelector).find(circleSelector).should('have.text', '')
      // Small top circle has been appeared
      cy.wrap(cs).eq(0).find(circleContentSelector).get(circleSmallBottomSelector).find(circleSelector).should('not.have.text', '')
      cy.wrap(cs).eq(0).find(circleContentSelector).get(circleSmallBottomSelector).find(circleSelector).should('have.css', 'border-color', changingColor)
    })
    cy.wait(SHORT_DELAY_IN_MS)
    cy.get(listItemSelector).then(cs => {
      cy.wrap(cs).should('have.length', LIST_INIT_ARRAY_SIZE - 1)
      // Small top circle has been disappeared
      cy.wrap(cs).eq(0).find(circleContentSelector).find(circleSmallBottomSelector).should('have.length', 0)
      // Added big circle
      cy.wrap(cs).eq(0).find(circleContentSelector).find(circleSelector).should('not.have.text', '')
      cy.wrap(cs).eq(0).find(circleContentSelector).find(circleIndexSelector).should('have.text', '0')
    })
  })

  it('Удаление элемента из tail', () => {
    cy.get(delTailButtonSelector).click()
    cy.get(listItemSelector).then(cs => {
      cy.wrap(cs).should('have.length', LIST_INIT_ARRAY_SIZE)
      // Big circle
      cy.wrap(cs).eq(LIST_INIT_ARRAY_SIZE - 1).find(circleContentSelector).not(circleSmallBottomSelector).find(circleSelector).should('have.text', '')
      // Small top circle has been appeared
      cy.wrap(cs).eq(LIST_INIT_ARRAY_SIZE - 1).find(circleContentSelector).get(circleSmallBottomSelector).find(circleSelector).should('not.have.text', '')
      cy.wrap(cs).eq(LIST_INIT_ARRAY_SIZE - 1).find(circleContentSelector).get(circleSmallBottomSelector).find(circleSelector).should('have.css', 'border-color', changingColor)
    })
    cy.wait(SHORT_DELAY_IN_MS)
    cy.get(listItemSelector).then(cs => {
      cy.wrap(cs).should('have.length', LIST_INIT_ARRAY_SIZE - 1)
      // Small top circle has been disappeared
      cy.wrap(cs).eq(LIST_INIT_ARRAY_SIZE - 2).find(circleContentSelector).find(circleSmallBottomSelector).should('have.length', 0)
      // Added big circle
      cy.wrap(cs).eq(LIST_INIT_ARRAY_SIZE - 2).find(circleContentSelector).find(circleSelector).should('not.have.text', '')
      cy.wrap(cs).eq(LIST_INIT_ARRAY_SIZE - 2).find(circleContentSelector).find(circleIndexSelector).should('have.text', (LIST_INIT_ARRAY_SIZE - 2).toString())
    })
  })

  it('Удаление элемента по индексу', () => {
    const index = 3
    let lIndex = 0
    let hIndex = index
    cy.get(inputIndexSelector).type(index.toString())
    cy.get(delByIndexButtonSelector).click()
    iterate(lIndex, hIndex)
    //
    cy.get(listItemSelector).then(cs => {
      cy.wrap(cs).should('have.length', LIST_INIT_ARRAY_SIZE)
      // Big circle
      cy.wrap(cs).eq(index).find(circleContentSelector).not(circleSmallBottomSelector).find(circleSelector).should('have.text', '')
      // Small top circle has been appeared
      cy.wrap(cs).eq(index).find(circleContentSelector).get(circleSmallBottomSelector).find(circleSelector).should('not.have.text', '')
      cy.wrap(cs).eq(index).find(circleContentSelector).get(circleSmallBottomSelector).find(circleSelector).should('have.css', 'border-color', changingColor)
    })
    cy.wait(SHORT_DELAY_IN_MS)
    cy.get(listItemSelector).then(cs => {
      cy.wrap(cs).should('have.length', LIST_INIT_ARRAY_SIZE - 1)
      // Small top circle has been disappeared
      cy.wrap(cs).eq(index).find(circleContentSelector).find(circleSmallBottomSelector).should('have.length', 0)
      // Added big circle
      cy.wrap(cs).eq(index).find(circleContentSelector).find(circleSelector).should('not.have.text', '')
      cy.wrap(cs).eq(index).find(circleContentSelector).find(circleIndexSelector).should('have.text', index.toString())
    })
  })

})
