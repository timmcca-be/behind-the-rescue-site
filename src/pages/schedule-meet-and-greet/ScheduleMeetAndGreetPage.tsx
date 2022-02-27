import React, { FormEventHandler, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { zonedTimeToUtc } from 'date-fns-tz';
import { useAdoptionEvent } from '../../hooks/api/useAdoptionEvent';
import { AnimalDto } from '../../models/AnimalDto';
import { Spinner } from '../../components/common/spinner/Spinner';
import { useValidation } from '../../hooks/validation/useValidation';
import { useScheduleMeetAndGreet } from '../../hooks/api/useScheduleMeetAndGreet';
import styles from '../../components/common/formStyles.module.css';
import { AnimalSingleSelect } from '../../components/schedule-meet-and-greet/animal-single-select/AnimalSingleSelect';
import { useAnimals } from '../../hooks/api/useAnimals';
import { Species } from '../../models/Species';

export type ScheduleMeetAndGreetPageParams = {
  adoptionEventID: string;
}

enum ValidationError {
  NoAnimalSelected = 'noAnimalSelected',
  TimeNotSet = 'timeNotSet',
  NoPotentialAdopterName = 'noPotentialAdopterName',
};

export const ScheduleMeetAndGreetPage = () => {
  const params = useParams<ScheduleMeetAndGreetPageParams>();
  const adoptionEventID = Number.parseInt(params.adoptionEventID);

  const history = useHistory();

  const adoptionEvent = useAdoptionEvent(adoptionEventID).data?.adoptionEvent;
  const scheduleMeetAndGreetMutation = useScheduleMeetAndGreet(adoptionEventID, adoptionEvent?.nextOccurrenceDate);

  const animals = useAnimals(
    adoptionEvent?.availableSpecies ?? Species.Dog,
    {
      enabled: adoptionEvent !== undefined,
    },
  ).data?.animals;

  const [animal, setAnimal] = useState<AnimalDto | undefined>(undefined);
  const [time, setTime] = useState<string>("");
  const [potentialAdopterName, setPotentialAdopterName] = useState<string>("");
  const [fullyVaccinated, setFullyVaccinated] = useState(true);

  const {displayedErrors, validate} = useValidation({
    [ValidationError.NoAnimalSelected]: animal === undefined,
    [ValidationError.TimeNotSet]: time === "",
    [ValidationError.NoPotentialAdopterName]: potentialAdopterName === "",
  });

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }
    const timestamp = zonedTimeToUtc(
      `${adoptionEvent!.nextOccurrenceDate} ${time}`,
      adoptionEvent!.timeZone,
    );
    await scheduleMeetAndGreetMutation.mutateAsync({
      animalID: animal!.id,
      timestamp: timestamp.toISOString(),
      potentialAdopterName,
      fullyVaccinated,
    });
    history.push(`/adoption-events/${adoptionEventID}/meet-and-greets`);
  }

  return (
    <>
      <h2>Schedule a meet {"&"} greet</h2>
      <form
        className={styles.form}
        onSubmit={onSubmit}
      >
        {displayedErrors[ValidationError.NoAnimalSelected] && (
          <small className={styles.error}>
            A {adoptionEvent?.availableSpecies.toLowerCase()} must be selected
          </small>
        )}
        {adoptionEvent && (
          <AnimalSingleSelect
            species={adoptionEvent.availableSpecies}
            selectableAnimals={animals}
            selectedAnimal={animal}
            setSelectedAnimal={setAnimal}
          />
        )}
        {displayedErrors[ValidationError.TimeNotSet] && (
          <small className={styles.error}>Time must be set</small>
        )}
        <label className={styles.inputGroup}>
          Time:{" "}
          <input
            type="time"
            value={time}
            onChange={(event) => setTime(event.target.value)}
          />
        </label>
        {displayedErrors[ValidationError.TimeNotSet] && (
          <small className={styles.error}>Time must be set</small>
        )}
        <label className={styles.inputGroup}>
          Potential adopter name:{" "}
          <input
            type="text"
            value={potentialAdopterName}
            onChange={(event) => setPotentialAdopterName(event.target.value)}
          />
        </label>
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
          disabled={scheduleMeetAndGreetMutation.isLoading}
        >
          {scheduleMeetAndGreetMutation.isLoading ? (
            <Spinner />
          ) : 'Schedule'}
        </button>
      </form>
    </>
  )
}
