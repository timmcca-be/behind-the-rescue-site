import React, { FormEventHandler, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAdoptionEvent } from '../../hooks/api/useAdoptionEvent';
import { AnimalDto } from '../../models/AnimalDto';
import { CrateSize } from '../../models/CrateSize';
import styles from './ReserveCratePage.module.css';
import { useReserveCrate } from '../../hooks/api/useReserveCrate';
import { Spinner } from '../../components/common/spinner/Spinner';
import { CrateSizeSelect } from '../../components/reserve-crate/crate-size-select/CrateSizeSelect';
import { AnimalSelect } from '../../components/reserve-crate/animal-select/AnimalSelect';
import { useValidation } from '../../hooks/validation/useValidation';

export type ReserveCratePageParams = {
  adoptionEventID: string;
}

enum ValidationError {
  CrateSizeNotSet = 'crateSizeNotSet',
  NoAnimalsSelected = 'noAnimalsSelected',
};

export const ReserveCratePage = () => {
  const params = useParams<ReserveCratePageParams>();
  const adoptionEventID = Number.parseInt(params.adoptionEventID);

  const history = useHistory();

  const adoptionEvent = useAdoptionEvent(adoptionEventID).data?.adoptionEvent;
  const reserveCrateMutation = useReserveCrate(adoptionEventID, adoptionEvent?.nextOccurrenceDate);

  const [crateSize, setCrateSize] = useState<CrateSize | null>(null);
  const [animals, setAnimals] = useState<AnimalDto[]>([]);
  const [fullyVaccinated, setFullyVaccinated] = useState(true);

  const { displayedErrors, validate } = useValidation({
    [ValidationError.CrateSizeNotSet]: crateSize === null,
    [ValidationError.NoAnimalsSelected]: animals.length === 0,
  });

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }
    await reserveCrateMutation.mutateAsync({
      crateSize: crateSize as CrateSize,
      animalIDs: animals.map((animal) => animal.id),
      fullyVaccinated,
    });
    history.push(`/adoption-events/${adoptionEventID}`);
  }

  return (
    <>
      <h2>Reserve a crate</h2>
      <form
        className={styles.form}
        onSubmit={onSubmit}
      >
        {displayedErrors[ValidationError.CrateSizeNotSet] && (
          <small className={styles.error}>Crate size must be selected</small>
        )}
        <label className={styles.inputGroup}>
          Crate size:{' '}
          <CrateSizeSelect
            crateSize={crateSize}
            setCrateSize={setCrateSize}
          />
        </label>
        {displayedErrors[ValidationError.NoAnimalsSelected] && (
          <small className={styles.error}>At least one animal must be added</small>
        )}
        {adoptionEvent && (
          <AnimalSelect
            species={adoptionEvent.availableSpecies}
            date={adoptionEvent.nextOccurrenceDate}
            selectedAnimals={animals}
            setSelectedAnimals={setAnimals}
          />
        )}
        <label className={styles.inputGroup}>
          <input
            type="checkbox"
            checked={fullyVaccinated}
            onChange={(event) => setFullyVaccinated(event.target.checked)}
          />
          Fully vaccinated
        </label>
        <button
          className={styles.submit}
          disabled={reserveCrateMutation.isLoading}
        >
          {reserveCrateMutation.isLoading ? (
            <Spinner />
          ) : 'Reserve'}
        </button>
      </form>
    </>
  )
}
