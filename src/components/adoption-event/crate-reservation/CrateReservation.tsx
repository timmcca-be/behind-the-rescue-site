import React from 'react';
import { FaCube, FaExclamationTriangle, FaTimes } from 'react-icons/fa';
import { CrateReservationDto } from '../../../models/CrateReservationDto';
import { CrateSize } from '../../../models/CrateSize';
import styles from './CrateReservation.module.css';
import sharedStyles from '../../common/sharedStyles.module.css';
import { AnimalLink } from '../../common/animal/animal-link/AnimalLink';
import { useCancelCrateReservation } from '../../../hooks/api/useCancelCrateReservation';

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
}: CrateReservationProps) => {
  const cancelCrateReservationMutation = useCancelCrateReservation(
    crateReservation.id,
  );
  const onClickCancel = () => {
    if (window.confirm('Are you sure you want to cancel this reservation?')) {
      cancelCrateReservationMutation.mutate();
    }
  };

  return (
    <article className={styles.crateReservation}>
      <header className={styles.header}>
        <span className={styles.crateSize}>
          <FaCube title="Crate size" className={sharedStyles.icon} />
          {formatCrateSize(crateReservation.crateSize)}
        </span>
        <button
          className={[styles.cancelButton, sharedStyles.clickable].join(' ')}
          onClick={onClickCancel}
        >
          <FaTimes title="Cancel" />
        </button>
      </header>
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
};
