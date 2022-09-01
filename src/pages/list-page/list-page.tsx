import React, {FormEvent, useEffect, useState} from "react";
import {SolutionLayout} from "../../components/ui/solution-layout/solution-layout";
import styles from "../pages.module.css";
import InputArea from "../../components/ui/input-area/input-area";
import {Button} from "../../components/ui/button/button";
import {Input} from "../../components/ui/input/input";
import {ElementStates, ICircleElement, ListAction} from "../../types";
import {ArrowIcon} from "../../components/ui/icons/arrow-icon";
import {Circle} from "../../components/ui/circle/circle";
import {HEAD, LIST_INIT_ARRAY, LIST_MAX_VALUE_LEN, LIST_MIN_VALUE_LEN, SHORT_DELAY_IN_MS, TAIL} from "../../constants";
import {LinkedListAlgorithm} from "../../components/algorithm/linkedListAlgorithm";

export const ListPage: React.FC = () => {

  const [inputValue, setInputValue] = useState<string>('')
  const [inputIndex, setInputIndex] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [elements, setElements] = useState<ICircleElement[]>([])
  const [algorithm, setAlgorithm] = useState<LinkedListAlgorithm>()
  const [action, setAction] = useState<ListAction>()

  const isAddAction = action === ListAction.AddToHead || action === ListAction.AddToTail || action === ListAction.AddByIndex
  const isDelAction = action === ListAction.DelFromHead || action === ListAction.DelFromTail || action === ListAction.DelByIndex

  const handleValueChanged = (event: FormEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value)
  }

  const handleIndexChanged = (event: FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value
    if (isNaN(Number(value))) {
      return
    }
    if (Number(value) < 0 || Number(value) >= elements.length) {
      return
    }
    setInputIndex(value)
  }

  const handleAddHead = async () => {
    setAction(ListAction.AddToHead)
    if (algorithm) {
      await algorithm.animateAddHead({
        value: inputValue,
        state: ElementStates.Modified,
        extraCircle : {
          value: inputValue,
          state: ElementStates.Changing,
        }
      })
    }
    setInputValue('')
    setAction(undefined)
  }

  const handleAddTail = async () => {
    setAction(ListAction.AddToTail)
    if (algorithm) {
      await algorithm.animateAddTail({
        value: inputValue,
        state: ElementStates.Modified,
        extraCircle : {
          value: inputValue,
          state: ElementStates.Changing,
        }
      })
    }
    setInputValue('')
    setAction(undefined)
  }

  const handleDelHead = async () => {
    setAction(ListAction.DelFromHead)
    if (algorithm) {
      await algorithm.animateDelHead()
    }
    setAction(undefined)
  }

  const handleDelTail = async () => {
    setAction(ListAction.DelFromTail)
    if (algorithm) {
      await algorithm.animateDelTail()
    }
    setAction(undefined)
  }

  const handleAddByIndex = async () => {
    setAction(ListAction.AddByIndex)
    if (algorithm) {
      await algorithm.animateAddByIndex(Number(inputIndex), {
        value: inputValue,
        state: ElementStates.Modified,
        extraCircle : {
          value: inputValue,
          state: ElementStates.Changing,
        }
      })
    }
    setInputValue('')
    setInputIndex('')
    setAction(undefined)
  }

  const handleDelByIndex = async () => {
    setAction(ListAction.DelByIndex)
    if (algorithm) {
      await algorithm.animateDelByIndex(Number(inputIndex))
    }
    setInputIndex('')
    setAction(undefined)
  }

  useEffect(() => {
    const alg = new LinkedListAlgorithm({loadingFunc: setLoading, resultFunc: setElements}, SHORT_DELAY_IN_MS)
    setAlgorithm(alg)
    setAction(ListAction.AddToTail)
    const init = async () => {
      await alg.animateInit(LIST_INIT_ARRAY)
    }
    init().then(() => console.log('Init List has been built'))
    setAction(ListAction.AddToTail)
  }, [])

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.listContainer}>
        <InputArea>
          <Input
            disabled={loading}
            extraClass={styles.inputValue}
            placeholder="Введите значение"
            min={LIST_MIN_VALUE_LEN}
            maxLength={LIST_MAX_VALUE_LEN}
            value={inputValue || ''}
            onChange={handleValueChanged}
            isLimitText={true}
          />
          <Button
            extraClass={styles.button}
            disabled={loading || !inputValue}
            isLoader={loading && action === ListAction.AddToHead}
            text="Добавить в head"
            onClick={handleAddHead}
          />
          <Button
            extraClass={styles.button}
            isLoader={loading && action === ListAction.AddToTail}
            disabled={loading || !inputValue}
            text="Добавить в tail"
            onClick={handleAddTail}
          />
          <Button
            extraClass={styles.button}
            disabled={loading || elements.length === 0}
            isLoader={loading && action === ListAction.DelFromHead}
            text="Удалить из head"
            onClick={handleDelHead}
          />
          <Button
            extraClass={styles.button}
            disabled={loading || elements.length === 0}
            isLoader={loading && action === ListAction.DelFromTail}
            text="Удалить из tail"
            onClick={handleDelTail}
          />
        </InputArea>
        <InputArea>
          <Input
            extraClass={styles.inputIndex}
            disabled={loading}
            type="text"
            placeholder="Введите индекс"
            maxLength={2}
            value={inputIndex}
            onChange={handleIndexChanged}
          />
          <Button
            extraClass={styles.bigButton}
            disabled={!inputValue || !inputIndex || loading || Number(inputIndex) > elements.length - 1}
            isLoader={loading && action === ListAction.AddByIndex}
            text="Добавить по индексу"
            onClick={handleAddByIndex}
          />
          <Button
            extraClass={styles.bigButton}
            isLoader={loading && action === ListAction.DelByIndex}
            disabled={!inputIndex || loading || Number(inputIndex) > elements.length - 1}
            text="Удалить по индексу"
            onClick={handleDelByIndex}
          />
        </InputArea>
      </div>
      <ul className={styles.circleList}>
        {
          elements.map((char, idx) => {
            return (
              <div className={styles.listItemContainer} key={idx}>
                <Circle
                  state={char.state}
                  letter={char.value}
                  index={idx}
                  head={idx === 0 && !char.extraCircle ? HEAD : ''}
                  tail={idx === elements.length - 1 && !char.extraCircle ? TAIL : ''}
                />
                {
                  idx !== elements.length - 1 && (
                    <ArrowIcon
                      fill={
                        char.state === ElementStates.Changing ? '#D252E1' : '#0032FF'
                      }
                    />
                  )
                }
                {
                  char.extraCircle && isAddAction && (
                    <Circle
                      extraClass={styles.topCircle}
                      state={ElementStates.Changing}
                      letter={char.extraCircle.value}
                      isSmall={true}
                    />
                  )
                }
                {
                  char.extraCircle && isDelAction && (
                    <Circle
                      extraClass={styles.bottomCircle}
                      state={ElementStates.Changing}
                      letter={char.extraCircle.value}
                      isSmall={true}
                    />
                  )
                }
              </div>
            )
          })
        }
      </ul>
    </SolutionLayout>
  )
}
