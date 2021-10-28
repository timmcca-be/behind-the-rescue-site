import React from 'react';
import { FaUser } from 'react-icons/fa';
import { AnimalDto } from '../../../models/AnimalDto';
import styles from './AnimalInfo.module.css';

export type AnimalInfoProps = {
  animal: AnimalDto;
}

export const AnimalInfo = ({ animal }: AnimalInfoProps) => (
  <article className={styles.animalInfo}>
    <h3 className={styles.animalName}>{animal.name}</h3>
    <span className={styles.iconData}>
      <FaUser
        title="Foster"
        className={styles.icon}
      />
      {animal.foster}
    </span>
  </article>
)
