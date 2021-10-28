import React, { FormEventHandler, useState } from 'react';
import { FaMinusCircle, FaPlus } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { AnimalPicker } from '../../components/reserve-crate/animal-picker/AnimalPicker';
import { useAdoptionEvent } from '../../hooks/useAdoptionEvent';
import { AnimalDto } from '../../models/AnimalDto';
import { CrateSize } from '../../models/CrateSize';
import styles from './ReserveCrateForm.module.css';
import sharedStyles from '../../components/common/sharedStyles.module.css';
import { AnimalPhoto } from '../../components/common/animal-photo/AnimalPhoto';
import { AnimalInfo } from '../../components/common/animal-info/AnimalInfo';
import { useReserveCrate } from '../../hooks/useReserveCrate';

export type ReserveCrateFormParams = {
  adoptionEventID: string;
}

type ValidationErrors = {
  crateSizeNotSet: boolean;
  noAnimalsSelected: boolean;
}

// TODO: big fat refactor (maybe react hook forms?)
export const ReserveCrateForm = () => {
  const params = useParams<ReserveCrateFormParams>();
  const adoptionEventID = Number.parseInt(params.adoptionEventID);

  const adoptionEvent = useAdoptionEvent(adoptionEventID).data?.adoptionEvent;
  const reserveCrateMutation = useReserveCrate(adoptionEventID, adoptionEvent?.nextOccurrenceDate);

  const [crateSize, setCrateSize] = useState<CrateSize | ''>('');
  const [animals, setAnimals] = useState<AnimalDto[]>([]);
  const [fullyVaccinated, setFullyVaccinated] = useState(true);

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
    crateSizeNotSet: false,
    noAnimalsSelected: false,
  });

  const [isAnimalPickerOpen, setAnimalPickerOpen] = useState(false);
  const removeAnimal = (animalID: number) => setAnimals((animals) => animals.filter((animal) => animal.id !== animalID));

  const crateSizeNotSet = crateSize === '';
  const noAnimalsSelected = animals.length === 0;

  if ((validationErrors.crateSizeNotSet && !crateSizeNotSet)
    || (validationErrors.noAnimalsSelected && !noAnimalsSelected)
  ) {
    setValidationErrors({ crateSizeNotSet, noAnimalsSelected });
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (crateSizeNotSet || noAnimalsSelected) {
      setValidationErrors({ crateSizeNotSet, noAnimalsSelected });
    } else {
      reserveCrateMutation.mutate({
        crateSize,
        animalIDs: animals.map((animal) => animal.id),
        fullyVaccinated,
      });
    }
  }

  return (
    <>
      <h1>Reserve a crate</h1>
      <form
        className={styles.form}
        onSubmit={onSubmit}
      >
        {validationErrors.crateSizeNotSet && (
          <small className={styles.error}>Crate size must be selected</small>
        )}
        <label className={styles.inputGroup}>
          Crate size:{' '}
          <select
            value={crateSize}
            onChange={(event) => setCrateSize(event.target.value as CrateSize)}
          >
            <option disabled value={''}> -- Select an option -- </option>
            <option value={CrateSize.Small}>Small</option>
            <option value={CrateSize.Medium}>Medium</option>
            <option value={CrateSize.Large}>Large</option>
            <option value={CrateSize.ExtraLarge}>Extra large</option>
          </select>
        </label>
        {validationErrors.noAnimalsSelected && (
          <small className={styles.error}>At least one animal must be added</small>
        )}
        <ul className={[
          sharedStyles.list,
          styles.animals,
        ].join(' ')}>
          {animals.map((animal) => (
            <li
              key={animal.id}
              className={sharedStyles.animalListItem}
            >
              <AnimalPhoto animal={animal} />
              <AnimalInfo animal={animal} />
              <button
                type="button"
                onClick={() => removeAnimal(animal.id)}
                className={styles.removeButton}
              >
                <FaMinusCircle
                  title="Remove"
                  className={styles.icon}
                />
                Remove
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setAnimalPickerOpen(true)}
          className={styles.addAnimals}
        >
          <FaPlus className={styles.icon} />
          Add animals
        </button>
        { adoptionEvent && (
          <AnimalPicker
            isOpen={isAnimalPickerOpen}
            species={adoptionEvent.availableSpecies}
            date={adoptionEvent.nextOccurrenceDate}
            animals={animals}
            setAnimals={setAnimals}
            close={() => setAnimalPickerOpen(false)}
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
        <button className={styles.submit}>
          Reserve
        </button>
      </form>
    </>
  )
}
