import React from 'react';
import { useCrateReservations } from '../../../hooks/api/useCrateReservations';
import { Spinner } from '../../common/spinner/Spinner';
import { CrateReservation } from './crate-reservation/CrateReservation';

export type CrateReservationsPaneProps = {
  adoptionEventID: number;
  date: string;
};

export const CrateReservationsPane = ({
  adoptionEventID,
  date,
}: CrateReservationsPaneProps) => {
  const { data, isLoading } = useCrateReservations(adoptionEventID, date);

  return (
    <>
      {data?.crateReservations.map((crateReservation) => (
        <CrateReservation
          key={crateReservation.id}
          crateReservation={crateReservation}
        />
      ))}
      {isLoading && <Spinner />}
      {data?.crateReservations.length === 0 && 'None yet!'}
    </>
  );
};
