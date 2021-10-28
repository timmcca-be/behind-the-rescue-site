import React from 'react';
import { FaCube } from 'react-icons/fa';
import { CrateReservationDto } from '../../../models/CrateReservationDto';
import { CrateSize } from '../../../models/CrateSize';
import styles from './CrateReservation.module.css';
import sharedStyles from '../../common/sharedStyles.module.css';
import { AnimalPhoto } from '../../common/animal-photo/AnimalPhoto';
import { AnimalInfo } from '../../common/animal-info/AnimalInfo';

export type CrateReservationProps = {
  crateReservation: CrateReservationDto;
}

const formatCrateSize = (crateSize: CrateSize) => {
  switch (crateSize) {
    case CrateSize.Small:
      return 'Small';
    case CrateSize.Medium:
      return 'Medium';
    case CrateSize.Large:
      return 'Large';
    case CrateSize.ExtraLarge:
      return 'Extra large';
  }
}

export const CrateReservation = ({ crateReservation }: CrateReservationProps) => (
  <article className={styles.crateReservation}>
    <span className={styles.crateSize}>
      <FaCube
        title="Crate size"
        className={styles.icon}
      />
      {formatCrateSize(crateReservation.crateSize)}
    </span>
    <ul className={sharedStyles.list}>
      {
        crateReservation.animals.map((animal) => (
          <li
            key={animal.id}
            className={sharedStyles.animalListItem}
          >
            <AnimalPhoto animal={animal} />
            <AnimalInfo animal={animal} />
          </li>
        ))
      }
    </ul>
  </article>
)