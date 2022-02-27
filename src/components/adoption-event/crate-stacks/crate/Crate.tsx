import React from 'react';
import { CrateDto } from '../../../../models/CrateDto';
import { CrateSize } from '../../../../models/CrateSize';
import styles from './Crate.module.css';

export type CrateProps = {
  crate: CrateDto;
};

const crateSizeNames: Record<CrateSize, string> = {
  [CrateSize.Small]: 'S',
  [CrateSize.Medium]: 'M',
  [CrateSize.Large]: 'L',
  [CrateSize.ExtraLarge]: 'XL',
};

const crateSizeClasses: Record<CrateSize, string> = {
  [CrateSize.Small]: styles.smallCrate,
  [CrateSize.Medium]: styles.mediumCrate,
  [CrateSize.Large]: styles.largeCrate,
  [CrateSize.ExtraLarge]: styles.extraLargeCrate,
};

export const Crate = ({ crate }: CrateProps) => (
  <div
    className={[
      crateSizeClasses[crate.size],
      crate.isEmpty ? styles.emptyCrate : styles.fullCrate,
    ].join(' ')}
  >
    {crateSizeNames[crate.size]}
  </div>
);
