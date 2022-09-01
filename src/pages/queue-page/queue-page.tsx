import React, {FormEvent, useEffect, useState} from "react";
import {SolutionLayout} from "../../components/ui/solution-layout/solution-layout";
import InputArea from "../../components/ui/input-area/input-area";
import {Input} from "../../components/ui/input/input";
import styles from "../pages.module.css";
import {QUEUE_MAX_SIZE, QUEUE_MAX_VALUE_LEN, QUEUE_MIN_VALUE_LEN, SHORT_DELAY_IN_MS} from "../../constants";
import {Button} from "../../components/ui/button/button";
import {Circle} from "../../components/ui/circle/circle";
import {ElementStates, ICircleElement, QueueAction} from "../../types";
import {QueueAlgorithm} from "../../components/algorithm/queueAlgorithm";

export const QueuePage: React.FC = () => {

  const [inputValue, setInputValue] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [elements, setElements] = useState<ICircleElement[]>(Array.from({length: QUEUE_MAX_SIZE}))
  const [algorithm, setAlgorithm] = useState<QueueAlgorithm>()
  const [action, setAction] = useState<QueueAction.Add | QueueAction.Del>()
  const isFull = elements.filter(el => el && el?.value !== '').length === QUEUE_MAX_SIZE
  const isEmpty = elements.filter(el => el && el?.value !== '').length === 0

  const handleValueChanged = (event: FormEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value)
  }

  const handleEnqueue = async () => {
    setAction(QueueAction.Add)
    if (algorithm) {
      await algorithm.animateEnqueue({
        value: inputValue,
        state: ElementStates.Changing,
      })
    }
    setInputValue('')
  }

  const handleDequeue = async () => {
    setAction(QueueAction.Del)
    if (algorithm) {
      await algorithm.animateDequeue()
    }
  }

  const handleClear = () => {
    if (algorithm) {
      algorithm.animateClear()
    }
  }

  useEffect(() => {
    setAlgorithm(new QueueAlgorithm({loadingFunc: setLoading, resultFunc: setElements}, SHORT_DELAY_IN_MS))
  }, [])

  return (
    <SolutionLayout title="Очередь">
      <InputArea>
        <Input
          extraClass={styles.input}
          disabled={loading}
          placeholder="Введите значение"
          min={QUEUE_MIN_VALUE_LEN}
          maxLength={QUEUE_MAX_VALUE_LEN}
          value={inputValue || ''}
          isLimitText={true}
          onChange={handleValueChanged}
        />
        <Button
          disabled={!inputValue || loading || isFull}
          isLoader={loading && action === QueueAction.Add}
          text="Добавить"
          onClick={handleEnqueue}
        />
        <Button
          extraClass={styles.deleteBtn}
          isLoader={loading && action === QueueAction.Del}
          disabled={isEmpty || loading}
          onClick={handleDequeue}
          text="Удалить"
        />
        <Button
          disabled={isEmpty || loading}
          text="Очистить"
          onClick={handleClear}
        />
      </InputArea>

      <ul className={styles.circleList}>
        {
          elements.map((ch, idx) => {
            return ch == null ? (
              <Circle state={ElementStates.Default} letter={''} key={idx} index={idx} />
              ) : (
              <Circle state={ch.state} letter={ch.value} key={idx} index={idx} head={ch.value == null ? '' : ch.head} tail={ch.value == null ? '' : ch.tail} />
            )
          })
        }
      </ul>
    </SolutionLayout>
  )
}
