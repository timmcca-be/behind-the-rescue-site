import { Sex } from './Sex';
import { Species } from './Species';

export type AnimalDetailsDto = {
  id: number;
  name: string;
  species: Species;
  sex: Sex;
  foster: string;
  photoLinks: string[];
  dateOfBirth: string;
  monthsOld: number;
  breed: string;
  description: string;
};
