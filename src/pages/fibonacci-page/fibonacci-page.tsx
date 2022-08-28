import React, {FormEvent, useEffect, useState} from "react";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import InputArea from "../../components/ui/input-area/input-area";
import {Input} from "../../components/ui/input/input";
import {FIBONACCI_MAX_VALUE, FIBONACCI_MAX_VALUE_LEN, FIBONACCI_MIN_VALUE, SHORT_DELAY_IN_MS} from "../../constants";
import {Button} from "../../components/ui/button/button";
import {IElement} from "../../types";
import {Circle} from "../../components/ui/circle/circle";
import styles from "../pages.module.css";
import {FibonacciAlgorithm} from "../../components/algorithm/fibonacciAlgorithm";

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const [chars, setChars] = useState<IElement[]>([])
  const [algorithm, setAlgorithm] = useState<FibonacciAlgorithm>()

  const generate = async () => {
    if (algorithm) {
      await algorithm.animate()
    }
  }

  const handleValueChanged = (event: FormEvent<HTMLInputElement>) => {
    const value = Number(event.currentTarget.value.replace(/[^0-9]/g, ''))
    setInputValue(value)
    if (algorithm) {
      algorithm.resetAnimation(value)
    }
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await generate()
  }

  useEffect(() => {
    setAlgorithm(new FibonacciAlgorithm({loadingFunc: setLoading, resultFunc: setChars}, SHORT_DELAY_IN_MS))
  }, [])

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <InputArea>
        <Input
          extraClass={styles.input}
          disabled={loading}
          placeholder="Введите число от 1 до 19"
          type="number"
          maxLength={FIBONACCI_MAX_VALUE_LEN}
          min={FIBONACCI_MIN_VALUE}
          max={FIBONACCI_MAX_VALUE}
          value={inputValue || ''}
          onChange={handleValueChanged}
          isLimitText={true}
        />
        <Button
          disabled={inputValue ? inputValue > FIBONACCI_MAX_VALUE : true}
          isLoader={loading}
          text="Рассчитать"
          type="submit"
          onClick={handleSubmit}
        />
      </InputArea>

      <ul className={styles.circleList}>
        {chars.map((ch, idx) => {
          return (
            <Circle letter={ch.value} key={idx} index={idx} />
          )
        })}
      </ul>
    </SolutionLayout>
  )
}
