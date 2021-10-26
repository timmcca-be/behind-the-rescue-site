import { CrateSize } from "./CrateSize";

export type Crate = {
  size: CrateSize;
  isEmpty?: boolean;
}