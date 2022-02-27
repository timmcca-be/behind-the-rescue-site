import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { FaDog } from 'react-icons/fa';
import { AnimalDto } from '../../../models/AnimalDto';
import { Species } from '../../../models/Species';
import styles from './AnimalSingleSelect.module.css';
import sharedStyles from '../../common/sharedStyles.module.css';
import { SearchableAnimalList } from '../../common/animal/searchable-animal-list/SearchableAnimalList';
import { AnimalToggle } from '../../common/animal/animal-toggle/AnimalToggle';
import { AnimalPhoto } from '../../common/animal/animal-photo/AnimalPhoto';
import { AnimalInfo } from '../../common/animal/animal-info/AnimalInfo';

export type AnimalSingleSelectProps = {
  species: Species;
  selectableAnimals?: AnimalDto[];
  selectedAnimal: AnimalDto | undefined;
  setSelectedAnimal: Dispatch<SetStateAction<AnimalDto | undefined>>;
}

export const AnimalSingleSelect = ({
  species,
  selectableAnimals,
  selectedAnimal,
  setSelectedAnimal,
}: AnimalSingleSelectProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const closeModal = () => setModalOpen(false);

  const [filter, setFilter] = useState('');

  useEffect(() => setFilter(''), [isModalOpen]);
  
  return (
    <>
      {selectedAnimal !== undefined && (
        <article className={sharedStyles.animalDataContainer}>
          <AnimalPhoto animal={selectedAnimal} />
          <AnimalInfo animal={selectedAnimal} />
        </article>
      )}
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className={styles.addAnimals}
      >
        <FaDog className={sharedStyles.icon} />
        Select {species.toLowerCase()}
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <SearchableAnimalList
          animals={selectableAnimals}
          filter={filter}
          setFilter={setFilter}
        >
          {(animal) => (
            <AnimalToggle
              key={animal.id}
              animal={animal}
              checked={animal.id === selectedAnimal?.id}
              toggle={() => setSelectedAnimal(animal)}
            />
          )}
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
