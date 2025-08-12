"use client";

import { Controller, SubmitErrorHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import styles from "./page.module.scss";
import Characteristics from "./ui/characteristics/characteristics";
import ClassSelector from "./ui/class-selector/class-selector";
import { armourName, armours } from "./libs/armour";
import ArmourSelector from "./ui/armour-selector/armour-selector";
import { Spell } from "./libs/spells";
import Spells from "./ui/spells/spells";
import { Weapon } from "./libs/weapons";
import WeaponsSelector from "./ui/weapons-selector/weapons-selector";
import countModificator from "./libs/modificators";

export type dndClass =
  | "Бард"
  | "Варвар"
  | "Воин"
  | "Волшебник"
  | "Друид"
  | "Жрец"
  | "Изобретатель"
  | "Колдун"
  | "Монах"
  | "Паладин"
  | "Плут"
  | "Следопыт"
  | "Чародей";

export interface Form {
  name: string;
  class: dndClass;
  armour: armourName;
  hps: number;
  power: number;
  dexterity: number;
  endurance: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  lvl: number;
  spells: Spell[];
  experience: number;
  weapon: Weapon;
}

const сharacteristics = [
  "Сила",
  "Ловкость",
  "Выносливость",
  "Интеллект",
  "Мудрость",
  "Харизма",
];

export default function Home() {
  const { control, handleSubmit, register, watch } = useForm<Form>({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    defaultValues: {
      power: 8,
      dexterity: 8,
      endurance: 8,
      intelligence: 8,
      wisdom: 8,
      charisma: 8,
      spells: [],
    },
  });
  const submitHandler = async (data: Form) => {
    const armour = armours[data.armour];
    const res =
      `Имя противника: ${data.name}\n` +
      `Класс: ${data.class}\n` +
      `Уровень: ${data.lvl}\n` +
      `Здоровье: ${data.hps}\n` +
      `Броня: ${data.armour} ${armour.type} ${armour.armour}${
        armour.dexterity &&
        `+ЛОВ${
          armour.dexterityMax !== undefined
            ? ` (МАКС ${armour.dexterityMax})`
            : ""
        }`
      }${armour.stealth ? " (Помеха стелсу)" : ""}\n` +
      `Оружие: ${data.weapon.name} ${data.weapon.damage} (${data.weapon.properties})\n` +
      `Характеристики:\n${[
        data.power,
        data.dexterity,
        data.endurance,
        data.intelligence,
        data.wisdom,
        data.charisma,
      ]
        .map(
          (el, index) =>
            `\t ${сharacteristics[index]} ${el} (${countModificator(el)})`
        )
        .join("\n")}\n` +
      (data.spells && data.spells.length > 0
        ? `Заклинания:\n${data.spells
            .map(
              (el) =>
                `${el.name}\nВремя каста: ${
                  el.time
                }\nКомпоненты: ${el.components.join(", ")}\nДлительность: ${
                  el.duration
                }\nОписание: ${el.description}`
            )
            .join("\n")}\n`
        : "") +
      `Опыт: ${data.experience}`;
    console.log(res);
    await navigator.clipboard.writeText(res);
    toast.success("Результат скопирован в буфер обмена!");
  };
  const errorHandler: SubmitErrorHandler<Form> = (error) => {
    Object.values(error).map((el) => toast.error(el.message));
  };
  return (
    <div className={styles.wrapper}>
      <form
        className={styles.content}
        onSubmit={handleSubmit(submitHandler, errorHandler)}
      >
        <h1 className={styles.header}>Форма противника</h1>
        <div className={styles["input-container"]}>
          <input
            type="text"
            placeholder="Имя противника"
            className={styles.input}
            {...register("name", {
              required: { value: true, message: "Поле имени обязательно" },
            })}
          />
          <h3 className={styles["input-name"]}>Имя противника</h3>
        </div>
        <div className={styles["input-container"]}>
          <input
            type="text"
            placeholder="Кол-во HP"
            className={styles.input}
            {...register("hps", {
              required: { value: true, message: "Количество HP обязательно" },
              pattern: {
                value: /^[0-9]*$/,
                message: "HP выражается только в цифрах",
              },
            })}
          />
          <h3 className={styles["input-name"]}>Кол-во HP</h3>
        </div>
        <div className={styles["input-container"]}>
          <input
            type="text"
            placeholder="Уровень"
            className={styles.input}
            {...register("lvl", {
              required: { value: true, message: "Уровень обязателен" },
              pattern: {
                value: /^[0-9]*$/,
                message: "Уровень выражается только в цифрах",
              },
            })}
          />
          <h3 className={styles["input-name"]}>Уровень</h3>
        </div>
        <Controller
          name="class"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Необходимо выбрать класс",
            },
          }}
          render={({ field }) => <ClassSelector {...field} />}
        />
        <Controller
          name="armour"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Необходимо выбрать тип доспеха",
            },
          }}
          render={({ field }) => <ArmourSelector {...field} />}
        />
        <Controller
          name="weapon"
          control={control}
          render={({ field }) => <WeaponsSelector {...field} />}
        />
        <Characteristics control={control} />
        <Controller
          name="spells"
          control={control}
          render={({ field }) => <Spells watch={watch} {...field} />}
        />
        <div className={styles["input-container"]}>
          <input
            type="text"
            placeholder="Опыт"
            className={styles.input}
            {...register("experience", {
              required: { value: true, message: "Укажите опыт за убийство" },
              pattern: {
                value: /^[0-9]*$/,
                message: "Опыт выражается только в цифрах",
              },
            })}
          />
          <h3 className={styles["input-name"]}>Опыт</h3>
        </div>
        <button type="submit" className={styles.submit}>
          Готово!
        </button>
      </form>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="dark"
      />
    </div>
  );
}
