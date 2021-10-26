import React from 'react';
import { useParams } from 'react-router';
import { useAdoptionEvent } from '../../hooks/useAdoptionEvent';
import { useCrateReservations } from '../../hooks/useCrateReservations';

export type AdoptionEventParams = {
  adoptionEventID: string;
}

export const AdoptionEvent = () => {
  const adoptionEventID = Number.parseInt(useParams<AdoptionEventParams>().adoptionEventID);
  const adoptionEvent = useAdoptionEvent(adoptionEventID).data?.adoptionEvent;
  const crateReservations = useCrateReservations(adoptionEventID, adoptionEvent?.nextOccurrenceDate).data?.crateReservations;
  
  return (
    <>
      <h1>{adoptionEvent?.name}</h1>
      <h3>{adoptionEvent?.nextOccurrenceDate}</h3>
      <ul>
        {
          crateReservations?.map((crateReservation) => (
            <p key={crateReservation.id}>{crateReservation.crateSize}</p>
          ))
        }
      </ul>
    </>
  );
}
