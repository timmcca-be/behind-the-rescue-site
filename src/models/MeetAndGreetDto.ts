import { AnimalDto } from './AnimalDto';

export type MeetAndGreetDto = {
  id: number;
  date: string;
  timestamp: string;
  animal: AnimalDto;
  potentialAdopterName: string;
  fullyVaccinated: boolean;
};
