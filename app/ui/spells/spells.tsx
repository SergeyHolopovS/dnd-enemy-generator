import { Spell } from "@/app/libs/spells";
import { useState } from "react";
import styles from "./spells.module.scss";
import clsx from "clsx";
import { Form } from "@/app/page";
import { UseFormWatch } from "react-hook-form";

interface Props {
  value: Spell[];
  onChange: (value: Spell[]) => void;
  watch: UseFormWatch<Form>;
}

const classes: { [key: string]: string } = {
  Волшебник: "magisian",
  Бард: "bard",
  Друид: "druid",
  Жрец: "priest",
  Изобретатель: "inventor",
  Колдун: "witch",
  Паладин: "paladin",
  Следопыт: "pathfinder",
  Чародей: "sorcerer",
};

export default function Spells({ value, onChange, watch }: Props) {
  const [focus, setFocus] = useState<boolean>(false);
  const [className, lvl] = watch(["class", "lvl"]);
  const parseComponents = (components: string[]) => {
    if (components.map((el) => el.startsWith("М")).includes(true))
      return [...components.filter((el) => !el.startsWith("М")), "М"].join(
        ", "
      );
    return components.join(", ");
  };
  if (
    className === undefined ||
    !(lvl < 10 && lvl > 0) ||
    classes[className] === undefined
  )
    return;
  let spells: Spell[] = [];
  for (let level = 0; level <= lvl; level++) {
    spells = spells.concat(
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require(`../../../parser/spells/class_lvl/spells_${classes[className]}_${level}lvl.json`)
    );
  }
  console.log(value);
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
        {value.length > 0
          ? value
              .map((el, index) => {
                if (index === 0) return el.name;
                return el.name.toLowerCase();
              })
              .join(", ")
          : "Заклинания..."}
      </button>
      <div className={clsx(styles.choose, !focus && "opacity-0 -z-50!")}>
        <div className={styles["choose-content"]}>
          {spells
            .values()
            .toArray()
            .map((el, index) => (
              <button
                onClick={() => {
                  if (value.map((el) => el.name).includes(el.name))
                    onChange(value.filter((x) => x.name != el.name));
                  else onChange([...value, el]);
                  setFocus(false);
                }}
                className={clsx(
                  styles.el,
                  value.map((x) => x.name).includes(el.name) && "bg-white/30!"
                )}
                key={index}
                type="button"
              >
                <p className={styles["el-text"]}>{el.name}</p>
                <p className={styles["el-text"]}>
                  {parseComponents(el.components)}
                </p>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
