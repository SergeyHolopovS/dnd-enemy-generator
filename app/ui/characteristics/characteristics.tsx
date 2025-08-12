import Characteristic from "./components/characteristic";
import styles from "./characteristics.module.scss";
import { Controller } from "react-hook-form";
import type { Control } from "react-hook-form";
import { Form } from "@/app/page";

const names = [
  "Сила",
  "Ловкость",
  "Телосложение",
  "Интеллект",
  "Мудрость",
  "Харизма",
];

type name =
  | "power"
  | "dexterity"
  | "endurance"
  | "intelligence"
  | "wisdom"
  | "charisma";

const propsNames: name[] = [
  "power",
  "dexterity",
  "endurance",
  "intelligence",
  "wisdom",
  "charisma",
];

interface Props {
  control: Control<Form, unknown, Form>;
}

export default function Characteristics({ control }: Props) {
  return (
    <div className={styles.content}>
      {names.map((el, index) => (
        <Controller
          key={index}
          name={propsNames[index]}
          control={control}
          render={({ field }) => (
            <Characteristic label={names[index]} {...field} />
          )}
        />
      ))}
    </div>
  );
}
