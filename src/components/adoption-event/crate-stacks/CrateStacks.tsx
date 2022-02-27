import React from 'react';
import { CrateStackDto } from '../../../models/CrateStackDto';
import { Crate } from './crate/Crate';
import styles from './CrateStacks.module.css';

export type CrateStacksProps = {
  crateStacks: CrateStackDto[];
};

export const CrateStacks = ({ crateStacks }: CrateStacksProps) => (
  <article className={styles.crateStacks}>
    {crateStacks.map((crateStack, index) => (
      <section key={index} className={styles.crateStack}>
        <Crate crate={crateStack.bottom} />
        {crateStack.top && <Crate crate={crateStack.top} />}
      </section>
    ))}
  </article>
);
