import { useState } from "react";
import styles from "./armour-selector.module.scss";
import clsx from "clsx";
import { armourName, armourNames, armours } from "@/app/libs/armour";

interface Props {
  value: armourName;
  onChange: (value: armourName) => void;
}

export default function ArmourSelector({ value, onChange }: Props) {
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
        {value !== undefined
          ? `${value} КД${armours[value].armour}${
              armours[value].dexterity && "+ЛОВ"
            }${
              armours[value].dexterityMax !== undefined
                ? `(МАКС ${armours[value].dexterityMax})`
                : ""
            } ${armours[value].type}`
          : "Тип доспеха..."}
      </button>
      <div className={clsx(styles.choose, !focus && "opacity-0 -z-50!")}>
        <div className={styles["choose-content"]}>
          {armourNames.map((el, index) => (
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
