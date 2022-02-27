import { AnimalDto } from './AnimalDto';

export type MeetAndGreetDto = {
  id: number;
  animal: AnimalDto;
  fullyVaccinated: boolean;
};
