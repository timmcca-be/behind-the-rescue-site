import { DayOfWeek } from './DayOfWeek';
import { Species } from './Species';

export type AdoptionEventDto = {
  id: number;
  name: string;
  location: string;
  availableSpecies: Species;
  dayOfWeek: DayOfWeek;
  nextOccurrenceDate: string;
  timeZone: string;
};
