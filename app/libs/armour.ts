export type armourType = "Лёгкий" | "Средний" | "Тяжёлый";

export type armour = {
  armour: number;
  type: armourType;
  dexterity: boolean;
  dexterityMax?: number;
  stealth: boolean;
};

export type armourName =
  | "Стёганый"
  | "Кожаный"
  | "Проклёпанный кожаный"
  | "Шкурный"
  | "Кольчужная рубаха"
  | "Чешуйчатый"
  | "Кираса"
  | "Полулаты"
  | "Колечный"
  | "Кольчуга"
  | "Наборный"
  | "Латы";

export const armourNames: armourName[] = [
  "Стёганый",
  "Кожаный",
  "Проклёпанный кожаный",
  "Шкурный",
  "Кольчужная рубаха",
  "Чешуйчатый",
  "Кираса",
  "Полулаты",
  "Колечный",
  "Кольчуга",
  "Наборный",
  "Латы",
];

export const armours: { [key: string]: armour } = {
  Стёганый: {
    armour: 11,
    type: "Лёгкий",
    dexterity: true,
    stealth: false,
  },
  Кожаный: {
    armour: 11,
    type: "Лёгкий",
    dexterity: true,
    stealth: true,
  },
  "Проклёпанный кожаный": {
    armour: 12,
    type: "Лёгкий",
    dexterity: true,
    stealth: true,
  },
  Шкурный: {
    armour: 12,
    type: "Средний",
    dexterity: true,
    dexterityMax: 2,
    stealth: true,
  },
  "Кольчужная рубаха": {
    armour: 13,
    type: "Средний",
    dexterity: true,
    dexterityMax: 2,
    stealth: true,
  },
  Чешуйчатый: {
    armour: 14,
    type: "Средний",
    dexterity: true,
    dexterityMax: 2,
    stealth: false,
  },
  Кираса: {
    armour: 14,
    type: "Средний",
    dexterity: true,
    dexterityMax: 2,
    stealth: true,
  },
  Полулаты: {
    armour: 15,
    type: "Средний",
    dexterity: true,
    dexterityMax: 2,
    stealth: false,
  },
  Колечный: {
    armour: 14,
    type: "Тяжёлый",
    dexterity: false,
    stealth: false,
  },
  Кольчуга: {
    armour: 16,
    type: "Тяжёлый",
    dexterity: false,
    stealth: false,
  },
  Наборный: {
    armour: 17,
    type: "Тяжёлый",
    dexterity: false,
    stealth: false,
  },
  Латы: {
    armour: 18,
    type: "Тяжёлый",
    dexterity: false,
    stealth: false,
  },
};
