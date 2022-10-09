import renderer from 'react-test-renderer';
import {Circle} from "./circle";
import {ElementStates} from "../../../types";

describe('Тестирование компонента Circle', () => {

  it('Без буквы', () => {
    const circle = renderer
      .create(<Circle />)
      .toJSON()
    expect(circle).toMatchSnapshot()
  })

  it('С буквами', () => {
    const circle = renderer
      .create(<Circle letter='LL' />)
      .toJSON()
    expect(circle).toMatchSnapshot()
  })

  it('С head', () => {
    const circle = renderer
      .create(<Circle head='H' />)
      .toJSON()
    expect(circle).toMatchSnapshot()
  })

  it('С react-элементом в head', () => {
    const circle = renderer
      .create(<Circle head={<Circle />} />)
      .toJSON()
    expect(circle).toMatchSnapshot()
  })

  it('С tail', () => {
    const circle = renderer
      .create(<Circle tail='T' />)
      .toJSON()
    expect(circle).toMatchSnapshot()
  })

  it('С react-элементом в tail', () => {
    const circle = renderer
      .create(<Circle tail={<Circle />} />)
      .toJSON()
    expect(circle).toMatchSnapshot()
  })

  it('С index', () => {
    const circle = renderer
      .create(<Circle index={0} />)
      .toJSON()
    expect(circle).toMatchSnapshot()
  })

  it('С prop isSmall ===  true', () => {
    const circle = renderer
      .create(<Circle isSmall />)
      .toJSON()
    expect(circle).toMatchSnapshot()
  })

  it('В состоянии default', () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Default} />)
      .toJSON()
    expect(circle).toMatchSnapshot()
  })

  it('В состоянии changing', () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Changing} />)
      .toJSON()
    expect(circle).toMatchSnapshot()
  })

  it('В состоянии modified', () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Modified} />)
      .toJSON()
    expect(circle).toMatchSnapshot()
  })

})
