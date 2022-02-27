import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { FaPlus } from 'react-icons/fa';
import { AnimalDto } from '../../../models/AnimalDto';
import { Species } from '../../../models/Species';
import { RemovableAnimal } from '../removable-animal/RemovableAnimal';
import styles from './AnimalMultiSelect.module.css';
import sharedStyles from '../../common/sharedStyles.module.css';
import { useAvailableAnimals } from '../../../hooks/api/useAvailableAnimals';
import { SearchableAnimalList } from '../../common/animal/searchable-animal-list/SearchableAnimalList';
import { AnimalToggle } from '../../common/animal/animal-toggle/AnimalToggle';

export type AnimalMultiSelectProps = {
  species: Species;
  date: string;
  selectedAnimals: AnimalDto[];
  setSelectedAnimals: Dispatch<SetStateAction<AnimalDto[]>>;
}

export const AnimalMultiSelect = ({
  species,
  date,
  selectedAnimals,
  setSelectedAnimals,
}: AnimalMultiSelectProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const closeModal = () => setModalOpen(false);

  const availableAnimals = useAvailableAnimals(species, date, {
    enabled: isModalOpen,
  }).data?.animals;
  const [filter, setFilter] = useState('');

  useEffect(() => setFilter(''), [isModalOpen]);

  const addAnimal = (animal: AnimalDto) => setSelectedAnimals((animals) => animals.concat([animal]));
  const removeAnimal = (animalID: number) => setSelectedAnimals((animals) =>
    animals.filter((animal) => animal.id !== animalID));
  
  const selectedAnimalIDs = new Set(selectedAnimals.map((animal) => animal.id));
  
  return (
    <>
      <ul className={[
        sharedStyles.list,
        styles.animals,
      ].join(' ')}>
        {selectedAnimals.map((animal) => (
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
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <SearchableAnimalList
          animals={availableAnimals}
          filter={filter}
          setFilter={setFilter}
        >
          {(animal) => {
            const isSelected = selectedAnimalIDs.has(animal.id);
            const toggle = isSelected ? () => removeAnimal(animal.id) : () => addAnimal(animal);
            
            return (
              <AnimalToggle
                key={animal.id}
                animal={animal}
                checked={isSelected}
                toggle={toggle}
              />
            )
          }}
        </SearchableAnimalList>
        <button
          onClick={closeModal}
          className={styles.done}
        >
          Done
        </button>
      </Modal>
    </>
  );
}
