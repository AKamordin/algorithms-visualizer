import React, {FormEvent, useEffect, useState} from "react";
import {SolutionLayout} from "../../components/ui/solution-layout/solution-layout";
import {IElement} from "../../types";
import InputArea from "../../components/ui/input-area/input-area";
import {Input} from "../../components/ui/input/input";
import {Button} from "../../components/ui/button/button";
import styles from "../pages.module.css";
import {Circle} from "../../components/ui/circle/circle";
import {StringAlgorithm} from "../../components/algorithm/stringAlgorithm";
import {STRING_MAX_LEN} from "../../constants";

export const StringPage: React.FC = () => {

  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [chars, setChars] = useState<IElement[]>([])
  const [algorithm, setAlgorithm] = useState<StringAlgorithm>()

  const reverseString = async () => {
    if (algorithm) {
      await algorithm.animate()
    }
  }

  const handleValueChanged = (event: FormEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value)
    if (algorithm) {
      algorithm.resetAnimation(event.currentTarget.value)
    }
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await reverseString()
  }

  useEffect(() => {
    setAlgorithm(new StringAlgorithm({loadingFunc: setLoading, resultFunc: setChars}))
  }, [])

  return (
    <SolutionLayout title="Строка">
        <InputArea>
          <Input
            extraClass={styles.input}
            disabled={loading}
            onChange={handleValueChanged}
            isLimitText={true}
            maxLength={STRING_MAX_LEN}
            value={inputValue}
          />
          <Button
            disabled={!inputValue}
            isLoader={loading}
            text="Развернуть"
            type="submit"
            onClick={handleSubmit}
          />
        </InputArea>

      <ul className={styles.circleList}>
        {chars.map((ch, idx) => {
          return (
            <Circle state={ch.state} letter={ch.value} key={idx} />
          )
        })}
      </ul>
    </SolutionLayout>
  )
}
