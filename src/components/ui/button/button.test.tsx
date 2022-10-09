import {Button} from './button';
import {render, screen, fireEvent} from '@testing-library/react';
import renderer from 'react-test-renderer';

describe('Тестирование компонента Button', () => {

  it('Кнопка с текстом', () => {
    const button = renderer
      .create(<Button text='OK' />)
      .toJSON()
    expect(button).toMatchSnapshot()
  })

  it('Кнопка без текста', () => {
    const button = renderer
      .create(<Button />)
      .toJSON()
    expect(button).toMatchSnapshot()
  })

  it('Заблокированная кнопка', () => {
    const button = renderer
      .create(<Button disabled />)
      .toJSON()
    expect(button).toMatchSnapshot()
  })

  it('Кнопка с индикацией загрузки', () => {
    const button = renderer
      .create(<Button isLoader />)
      .toJSON()
    expect(button).toMatchSnapshot()
  })

  it('Корректность вызова callBack при клике на кнопку', () => {
    window.alert = jest.fn();
    render(<Button text={'OK'} onClick={() => alert('MESSAGE')} />)
    const button = screen.getByText('OK')
    fireEvent.click(button);
    expect(window.alert).toHaveBeenCalledWith('MESSAGE');
  })

})
