import { AnimalDto } from "./AnimalDto";
import { CrateSize } from "./CrateSize";

export type CrateReservationDto = {
  id: number;
  animals: AnimalDto[];
  crateSize: CrateSize;
  fullyVaccinated: boolean;
}
