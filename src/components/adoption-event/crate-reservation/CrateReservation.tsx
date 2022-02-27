import React from 'react';
import { FaCube, FaExclamationTriangle } from 'react-icons/fa';
import { CrateReservationDto } from '../../../models/CrateReservationDto';
import { CrateSize } from '../../../models/CrateSize';
import styles from './CrateReservation.module.css';
import sharedStyles from '../../common/sharedStyles.module.css';
import { AnimalLink } from '../../common/animal/animal-link/AnimalLink';

export type CrateReservationProps = {
  crateReservation: CrateReservationDto;
};

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
};

export const CrateReservation = ({
  crateReservation,
}: CrateReservationProps) => (
  <article className={styles.crateReservation}>
    <span className={styles.crateSize}>
      <FaCube title="Crate size" className={sharedStyles.icon} />
      {formatCrateSize(crateReservation.crateSize)}
    </span>
    {!crateReservation.fullyVaccinated && (
      <span className={[sharedStyles.iconData, styles.warning].join(' ')}>
        <FaExclamationTriangle
          title="Crate size"
          className={sharedStyles.icon}
        />
        Not fully vaccinated
      </span>
    )}
    <ul className={sharedStyles.list}>
      {crateReservation.animals.map((animal) => (
        <AnimalLink key={animal.id} animal={animal} />
      ))}
    </ul>
  </article>
);
