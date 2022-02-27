import React from 'react';
import { FaCube } from 'react-icons/fa';
import { CrateReservationDto } from '../../../../models/CrateReservationDto';
import { CrateSize } from '../../../../models/CrateSize';
import styles from './CrateReservation.module.css';
import sharedStyles from '../../../common/sharedStyles.module.css';
import { AnimalLink } from '../../../common/animal/animal-link/AnimalLink';
import { useCancelCrateReservation } from '../../../../hooks/api/useCancelCrateReservation';
import { CancelButton } from '../../../common/cancel-button/CancelButton';
import { NotFullyVaccinatedWarning } from '../../../common/not-fully-vaccinated-warning/NotFullyVaccinatedWarning';

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

  return (
    <article className={styles.crateReservation}>
      <header className={styles.header}>
        <span className={styles.crateSize}>
          <FaCube title="Crate size" className={sharedStyles.icon} />
          {formatCrateSize(crateReservation.crateSize)}
        </span>
        <CancelButton
          confirmationMessage="Are you sure you want to cancel this reservation?"
          onCancel={() => cancelCrateReservationMutation.mutate()}
        />
      </header>
      {!crateReservation.fullyVaccinated && <NotFullyVaccinatedWarning />}
      <ul className={sharedStyles.list}>
        {crateReservation.animals.map((animal) => (
          <li key={animal.id} className={sharedStyles.animalListItem}>
            <AnimalLink animal={animal} />
          </li>
        ))}
      </ul>
    </article>
  );
};
