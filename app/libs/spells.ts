export interface Spell {
  name: string;
  lvl: "Заговор" | number;
  time: string;
  components: string[];
  duration: string;
  classes: string[];
  description: string;
}
