import React from 'react';
import { CrateSize } from '../../../models/CrateSize';

export type CrateSizeSelectProps = {
  value: CrateSize | null;
  setCrateSize: (crateSize: CrateSize) => void;
}

export const CrateSizeSelect = ({ value, setCrateSize }: CrateSizeSelectProps) => (
  <select
    value={value || ''}
    onChange={(event) => setCrateSize(event.target.value as CrateSize)}
  >
    <option disabled value={''}> -- Select an option -- </option>
    <option value={CrateSize.Small}>Small</option>
    <option value={CrateSize.Medium}>Medium</option>
    <option value={CrateSize.Large}>Large</option>
    <option value={CrateSize.ExtraLarge}>Extra large</option>
  </select>
)
