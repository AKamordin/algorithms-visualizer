import {SortAlgorithm} from "../../components/algorithm/sortAlgorithm";
import {Direction, ElementStates, SortMethod} from "../../types";

describe('Тестирование алгоритма сортировки выбором и пузырьком', () => {

  const algorithm = new SortAlgorithm({loadingFunc: () => {}, resultFunc: () => {}}, 0)

  it('Сортировка пузырьком. Пустой массив', async () => {
    algorithm.numberArray = []
    algorithm.setMethod(SortMethod.Bubble)
    await algorithm.animate()
    expect(algorithm.numberArray?.map(a => a.value)).toEqual([])
  })

  it('Сортировка пузырьком. Массив из одного элемента', async () => {
    algorithm.numberArray = [1].map(a => ({value: '' + a, state: ElementStates.Default}))
    algorithm.setMethod(SortMethod.Bubble)
    await algorithm.animate()
    expect(algorithm.numberArray?.map(a => Number(a.value))).toEqual([1])
  })

  it('Сортировка пузырьком. Массив из нескольких элементов по возрастанию', async () => {
    algorithm.numberArray = [6, 3, 8, 1, 7].map(a => ({value: '' + a, state: ElementStates.Default}))
    algorithm.setMethod(SortMethod.Bubble)
    algorithm.setDirection(Direction.Ascending)
    await algorithm.animate()
    expect(algorithm.numberArray?.map(a => Number(a.value))).toEqual([1, 3, 6, 7, 8])
  })

  it('Сортировка пузырьком. Массив из нескольких элементов по убыванию', async () => {
    algorithm.numberArray = [6, 3, 8, 1, 7].map(a => ({value: '' + a, state: ElementStates.Default}))
    algorithm.setMethod(SortMethod.Bubble)
    algorithm.setDirection(Direction.Descending)
    await algorithm.animate()
    expect(algorithm.numberArray?.map(a => Number(a.value))).toEqual([8, 7, 6, 3, 1])
  })

  it('Сортировка выбором. Пустой массив', async () => {
    algorithm.numberArray = []
    algorithm.setMethod(SortMethod.Selection)
    await algorithm.animate()
    expect(algorithm.numberArray?.map(a => a.value)).toEqual([])
  })

  it('Сортировка выбором. Массив из одного элемента', async () => {
    algorithm.numberArray = [1].map(a => ({value: '' + a, state: ElementStates.Default}))
    algorithm.setMethod(SortMethod.Selection)
    await algorithm.animate()
    expect(algorithm.numberArray?.map(a => Number(a.value))).toEqual([1])
  })

  it('Сортировка выбором. Массив из нескольких элементов по возрастанию', async () => {
    algorithm.numberArray = [6, 3, 8, 1, 7].map(a => ({value: '' + a, state: ElementStates.Default}))
    algorithm.setMethod(SortMethod.Selection)
    algorithm.setDirection(Direction.Ascending)
    await algorithm.animate()
    expect(algorithm.numberArray?.map(a => Number(a.value))).toEqual([1, 3, 6, 7, 8])
  })

  it('Сортировка выбором. Массив из нескольких элементов по убыванию', async () => {
    algorithm.numberArray = [6, 3, 8, 1, 7].map(a => ({value: '' + a, state: ElementStates.Default}))
    algorithm.setMethod(SortMethod.Selection)
    algorithm.setDirection(Direction.Descending)
    await algorithm.animate()
    expect(algorithm.numberArray?.map(a => Number(a.value))).toEqual([8, 7, 6, 3, 1])
  })

})
