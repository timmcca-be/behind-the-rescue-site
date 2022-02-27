import { Species } from './Species';

export type AnimalDto = {
  id: number;
  name: string;
  species: Species;
  photoLink: string;
  foster: string;
};
