import { DayOfWeek } from "./DayOfWeek";
import { Species } from "./Species";

export type AdoptionEvent = {
  id: number;
  name: string;
  availableSpecies: Species;
  dayOfWeek: DayOfWeek;
  nextOccurrenceDate: string;
}
