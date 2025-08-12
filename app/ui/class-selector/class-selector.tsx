import { useState } from "react";
import styles from "./class-selector.module.scss";
import clsx from "clsx";
import { dndClass } from "@/app/page";

const elements: dndClass[] = [
  "Бард",
  "Варвар",
  "Воин",
  "Волшебник",
  "Друид",
  "Жрец",
  "Изобретатель",
  "Колдун",
  "Монах",
  "Паладин",
  "Плут",
  "Следопыт",
  "Чародей",
];

interface Props {
  value: dndClass;
  onChange: (value: dndClass) => void;
}

export default function ClassSelector({ value, onChange }: Props) {
  const [focus, setFocus] = useState<boolean>(false);
  return (
    <div className={styles.container}>
      {
        focus && <button type="button" className={styles.blur} onClick={() => setFocus(false)}>...</button>
      }
      <button
        type="button"
        onClick={() => setFocus((prev) => !prev)}
        className={clsx(styles.button, focus && styles["button-focus"])}
      >
        {value || "Класс..."}
      </button>
      <div className={clsx(styles.choose, !focus && "opacity-0 -z-50!")}>
        <div className={styles["choose-content"]}>
          {elements.map((el, index) => (
            <button
              onClick={() => {
                onChange(el);
                setFocus(false);
              }}
              className={styles.el}
              key={index}
              type="button"
            >
              {el}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
