import { useState } from "react";
import styles from "./weapons-selector.module.scss";
import clsx from "clsx";
import { Weapon, weapons } from "@/app/libs/weapons";

interface Props {
  value: Weapon;
  onChange: (value: Weapon) => void;
}

export default function WeaponsSelector({ value, onChange }: Props) {
  const [focus, setFocus] = useState<boolean>(false);
  return (
    <div className={styles.container}>
      {focus && (
        <button
          type="button"
          className={styles.blur}
          onClick={() => setFocus(false)}
        >
          ...
        </button>
      )}
      <button
        type="button"
        onClick={() => setFocus((prev) => !prev)}
        className={clsx(styles.button, focus && styles["button-focus"])}
      >
        {value?.name || "Оружие..."}
      </button>
      <div className={clsx(styles.choose, !focus && "opacity-0 -z-50!")}>
        <div className={styles["choose-content"]}>
          {weapons.map((el, index) => (
            <button
              onClick={() => {
                onChange(el);
                setFocus(false);
              }}
              className={styles.el}
              key={index}
              type="button"
            >
              {el.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
