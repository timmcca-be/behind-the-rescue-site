import { CrateDto } from './CrateDto';

export type CrateStackDto = {
  bottom: CrateDto;
  top?: CrateDto;
};
