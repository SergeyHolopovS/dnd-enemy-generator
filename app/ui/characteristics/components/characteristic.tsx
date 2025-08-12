"use client";
import countModificator from "@/app/libs/modificators";
import styles from "./characteristic.module.scss";

interface Props {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

export default function Characteristic({ label, value, onChange }: Props) {
  const modificator = countModificator(value);
  const increment = () => {
    if (value < 30) onChange(value + 1);
  };
  const decrement = () => {
    if (value > 1) onChange(value - 1);
  };
  return (
    <div className={styles.content}>
      <h3 className={styles.label}>
        {label} ({modificator >= 0 && "+"}
        {modificator  })
      </h3>
      <div className={styles.incrementer}>
        <button
          type="button"
          onClick={decrement}
          className={styles["incrementer-minus"]}
        >
          <div className={styles["incrementer-minus-figure"]}>...</div>
        </button>
        <div className={styles["incrementer-content"]}>{value}</div>
        <button
          type="button"
          onClick={increment}
          className={styles["incrementer-plus"]}
        >
          +
        </button>
      </div>
    </div>
  );
}
