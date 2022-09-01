import {FC, ReactNode} from "react";
import styles from "./input-area.module.css";

const InputArea: FC<{children: ReactNode}> = ({children}) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}

export default InputArea

