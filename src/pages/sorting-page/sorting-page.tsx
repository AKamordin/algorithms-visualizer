import React, {useEffect, useState} from "react";
import {SolutionLayout} from "../../components/ui/solution-layout/solution-layout";
import styles from "../pages.module.css";
import InputArea from "../../components/ui/input-area/input-area";
import {RadioInput} from "../../components/ui/radio-input/radio-input";
import {Button} from "../../components/ui/button/button";
import {Direction, IElement, SortMethod} from "../../types";
import {Column} from "../../components/ui/column/column";
import {SortAlgorithm} from "../../components/algorithm/sortAlgorithm";
import {SORT_DELAY_IN_MS} from "../../constants";

export const SortingPage: React.FC = () => {

  const [loading, setLoading] = useState(false)
  const [columns, setColumns] = useState<IElement[]>([])
  const [algorithm, setAlgorithm] = useState<SortAlgorithm>()
  const [method, setMethod] = useState<SortMethod.Selection | SortMethod.Bubble>(SortMethod.Selection)
  const [direction, setDirection] = useState<Direction.Ascending | Direction.Descending>()

  const handleMethodChange = (method: SortMethod.Selection | SortMethod.Bubble) => {
    setMethod(method)
    if (algorithm) {
      algorithm.setMethod(method)
    }
  }

  const handleNewArray = () => {
    if (algorithm) {
      algorithm.resetAnimation()
    }
  }

  const handleAscendingSort = async () => {
    setDirection(Direction.Ascending)
    if (algorithm) {
      algorithm.setDirection(Direction.Ascending)
      await algorithm.animate()
    }
  }

  const handleDescendingSort = async () => {
    setDirection(Direction.Descending)
    if (algorithm) {
      algorithm.setDirection(Direction.Descending)
      await algorithm.animate()
    }
  }

  useEffect(() => {
    const alg = new SortAlgorithm({loadingFunc: setLoading, resultFunc: setColumns}, SORT_DELAY_IN_MS)
    setAlgorithm(alg)
    alg.resetAnimation()
  }, [])

  return (
    <SolutionLayout title="Сортировка массива">
      <InputArea>
        <div className={styles.radioButtons}>
          <RadioInput
            disabled={loading}
            checked={method === SortMethod.Selection}
            onChange={() => handleMethodChange(SortMethod.Selection)}
            value="selection"
            label="Выбор"
          />
          <RadioInput
            disabled={loading}
            checked={method === SortMethod.Bubble}
            onChange={() => handleMethodChange(SortMethod.Bubble)}
            value="bubble"
            label="Пузырёк"
          />
        </div>
        <div className={styles.buttonsContainer}>
          <Button
            sorting={Direction.Ascending}
            disabled={loading || columns.length === 0}
            isLoader={loading && direction === Direction.Ascending}
            text="По возрастанию"
            onClick={handleAscendingSort}
          />
          <Button
            sorting={Direction.Descending}
            disabled={loading || columns.length === 0}
            isLoader={loading && direction === Direction.Descending}
            text="По убыванию"
            onClick={handleDescendingSort}
          />
        </div>
        <Button
          disabled={loading}
          isLoader={false}
          text="Новый массив"
          type="submit"
          onClick={handleNewArray}
        />
      </InputArea>

      <ul className={styles.columnList}>
        {columns.map((ch, idx) => {
          return (
            <Column state={ch.state} index={Number(ch.value)} key={idx} />
          )
        })}
      </ul>
    </SolutionLayout>
  );
};
