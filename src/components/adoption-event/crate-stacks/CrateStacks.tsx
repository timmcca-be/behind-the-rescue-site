import React from 'react';
import { CrateSize } from '../../../models/CrateSize';
import { CrateStack } from '../../../models/CrateStack';
import styles from './CrateStacks.module.css';

export type CrateStacksProps = {
  crateStacks: CrateStack[];
}

const crateSizeNames: Record<CrateSize, string> = {
  [CrateSize.Small]: 'S',
  [CrateSize.Medium]: 'M',
  [CrateSize.Large]: 'L',
  [CrateSize.ExtraLarge]: 'XL',
}

const crateSizeClasses: Record<CrateSize, string> = {
  [CrateSize.Small]: styles.smallCrate,
  [CrateSize.Medium]: styles.mediumCrate,
  [CrateSize.Large]: styles.largeCrate,
  [CrateSize.ExtraLarge]: styles.extraLargeCrate,
}

export const CrateStacks = ({ crateStacks }: CrateStacksProps) => (
  <article className={styles.crateStacks}>
    {
      crateStacks.map((crates, index) => (
        <section key={index} className={styles.crateStack}>
          {
            crates.map((crate, index) => (
              <div
                key={index}
                className={[
                  crateSizeClasses[crate.size],
                  crate.isEmpty ? styles.emptyCrate : styles.fullCrate,
                ].join(' ')}
              >
                {crateSizeNames[crate.size]}
              </div>
            ))
          }
        </section>
      ))
    }
  </article>
)