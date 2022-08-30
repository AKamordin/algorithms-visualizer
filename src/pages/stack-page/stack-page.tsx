import React, {FormEvent, useEffect, useState} from "react";
import {SolutionLayout} from "../../components/ui/solution-layout/solution-layout";
import {ElementStates, ICircleElement, StackAction} from "../../types";
import {Circle} from "../../components/ui/circle/circle";
import styles from "../pages.module.css";
import InputArea from "../../components/ui/input-area/input-area";
import {Input} from "../../components/ui/input/input";
import {StackAlgorithm} from "../../components/algorithm/stackAlgorithm";
import {SHORT_DELAY_IN_MS, STACK_MAX_VALUE_LEN, STACK_MIN_VALUE_LEN} from "../../constants";
import {Button} from "../../components/ui/button/button";

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [elements, setElements] = useState<ICircleElement[]>([])
  const [algorithm, setAlgorithm] = useState<StackAlgorithm>()
  const [action, setAction] = useState<StackAction.Add | StackAction.Del>()

  const handleValueChanged = (event: FormEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value)
  }

  const handlePush = async () => {
    setAction(StackAction.Add)
    if (algorithm) {
      await algorithm.animatePush({
        value: inputValue,
        state: ElementStates.Changing,
      })
    }
    setInputValue('')
  }

  const handlePop = async () => {
    setAction(StackAction.Del)
    if (algorithm) {
      await algorithm.animatePop()
    }
  }

  const handleClear = () => {
    if (algorithm) {
      algorithm.animateClear()
    }
  }

  useEffect(() => {
    setAlgorithm(new StackAlgorithm({loadingFunc: setLoading, resultFunc: setElements}, SHORT_DELAY_IN_MS))
  }, [])

  return (
    <SolutionLayout title="Стек">
      <InputArea>
        <Input
          extraClass={styles.input}
          disabled={loading}
          placeholder="Введите текст"
          min={STACK_MIN_VALUE_LEN}
          maxLength={STACK_MAX_VALUE_LEN}
          value={inputValue || ''}
          isLimitText={true}
          onChange={handleValueChanged}
        />
        <Button
          disabled={!inputValue || loading || elements.length > 12}
          isLoader={loading && action === StackAction.Add}
          text="Добавить"
          onClick={handlePush}
        />
        <Button
          extraClass={styles.deleteBtn}
          isLoader={loading && action === StackAction.Del}
          disabled={!elements.length || loading}
          onClick={handlePop}
          text="Удалить"
        />
        <Button
          disabled={!elements.length || loading}
          text="Очистить"
          onClick={handleClear}
        />
      </InputArea>
      <ul className={styles.circleList}>
        {elements.map((char, idx) => {
          return (
            <Circle
              state={char.state}
              letter={char.value}
              index={idx}
              key={idx}
              head={char.head}
            />
          );
        })}
      </ul>
    </SolutionLayout>
  )
}
