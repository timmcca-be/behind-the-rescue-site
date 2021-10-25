import { Animal } from "./Animal";
import { CrateSize } from "./CrateSize";

export type CrateReservation = {
  id: number;
  animals: Animal[];
  crateSize: CrateSize;
  fullyVaccinated: boolean;
}
