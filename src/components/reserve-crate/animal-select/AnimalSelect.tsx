import React, { Dispatch, SetStateAction, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { AnimalDto } from '../../../models/AnimalDto';
import { Species } from '../../../models/Species';
import { AnimalPicker } from '../animal-picker/AnimalPicker';
import { RemovableAnimal } from '../removable-animal/RemovableAnimal';
import styles from './AnimalSelect.module.css';
import sharedStyles from '../../common/sharedStyles.module.css';

export type AnimalSelectProps = {
  species: Species;
  date: string;
  value: AnimalDto[];
  setSelectedAnimals: Dispatch<SetStateAction<AnimalDto[]>>;
}

export const AnimalSelect = ({
  species,
  date,
  value,
  setSelectedAnimals,
}: AnimalSelectProps) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const addAnimal = (animal: AnimalDto) => setSelectedAnimals((animals) => animals.concat([animal]));
  const removeAnimal = (animalID: number) => setSelectedAnimals((animals) =>
    animals.filter((animal) => animal.id !== animalID));
  
  return (
    <>
      <ul className={[
        sharedStyles.list,
        styles.animals,
      ].join(' ')}>
        {value.map((animal) => (
          <RemovableAnimal
            key={animal.id}
            animal={animal}
            remove={() => removeAnimal(animal.id)}
          />
        ))}
      </ul>
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className={styles.addAnimals}
      >
        <FaPlus className={sharedStyles.icon} />
        Add animals
      </button>
      <AnimalPicker
        isOpen={isModalOpen}
        species={species}
        date={date}
        selectedAnimals={value}
        addAnimal={addAnimal}
        removeAnimal={removeAnimal}
        close={() => setModalOpen(false)}
      />
    </>
  )
}
