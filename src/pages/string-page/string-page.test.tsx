import {StringAlgorithm} from "../../components/algorithm/stringAlgorithm";

describe('Тестирование алгоритма разворота строки', () => {

  const algorithm = new StringAlgorithm({loadingFunc: () => {}, resultFunc: () => {}}, 0)

  it('С чётным количеством символов', async () => {
    algorithm.resetAnimation('ABCD')
    await algorithm.animate()
    expect(algorithm.charArray?.map(a => a.value)).toEqual(['D', 'C', 'B', 'A'])
  })

  it('С нечетным количеством символов', async () => {
    algorithm.resetAnimation('HELLO')
    await algorithm.animate()
    expect(algorithm.charArray?.map(a => a.value)).toEqual(['O', 'L', 'L', 'E', 'H'])
  })

  it('С одним символом', async () => {
    algorithm.resetAnimation('A')
    await algorithm.animate()
    expect(algorithm.charArray?.map(a => a.value)).toEqual(['A'])
  })

  it('С пустой строкой', async () => {
    algorithm.resetAnimation('')
    await algorithm.animate()
    expect(algorithm.charArray?.map(a => a.value)).toEqual([])
  })

})
