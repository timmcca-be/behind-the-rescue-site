import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useAvailableAnimals } from '../../../hooks/api/useAvailableAnimals';
import { AnimalDto } from '../../../models/AnimalDto';
import { Species } from '../../../models/Species';
import { AnimalInfo } from '../../common/animal/animal-info/AnimalInfo';
import { AnimalPhoto } from '../../common/animal/animal-photo/AnimalPhoto';
import styles from './AnimalPicker.module.css';
import sharedStyles from '../../common/sharedStyles.module.css';
import { FaCheckCircle } from 'react-icons/fa';
import { SearchableAnimalList } from '../../common/animal/searchable-animal-list/SearchableAnimalList';

export type AnimalPickerProps = {
  isOpen: boolean;
  species: Species;
  date: string;
  selectedAnimals: AnimalDto[];
  addAnimal: (animal: AnimalDto) => void;
  removeAnimal: (animalID: number) => void;
  close: () => void;
}

const modalStyles: Modal.Styles = {
  overlay: { zIndex: 200 },
  content: {
    maxWidth: '40rem',
    maxHeight: '60%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
};

export const AnimalPicker = ({
  isOpen,
  species,
  date,
  selectedAnimals,
  addAnimal,
  removeAnimal,
  close,
}: AnimalPickerProps) => {
  const { data } = useAvailableAnimals(species, date, {
    enabled: isOpen,
  });
  const [filter, setFilter] = useState('');

  useEffect(() => setFilter(''), [isOpen]);

  const selectedAnimalIDs = new Set(selectedAnimals.map((animal) => animal.id));

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={close}
      style={modalStyles}
    >
      <SearchableAnimalList
        animals={data?.animals}
        filter={filter}
        setFilter={setFilter}
      >
        {(animal) => {
          const isSelected = selectedAnimalIDs.has(animal.id);
          const onClick = isSelected ? () => removeAnimal(animal.id) : () => addAnimal(animal);
          
          return (
            <li
              key={animal.id}
              onClick={onClick}
              className={[
                sharedStyles.animalListItem,
                sharedStyles.animalDataContainer,
                styles.clickable,
                isSelected ? styles.selected : '',
              ].join(' ')}
            >
              {isSelected ? (
                <FaCheckCircle
                  className={styles.check}
                  title={`${animal.name} (selected)`}
                />
              ) : (
                <AnimalPhoto animal={animal} />
              )}
              <AnimalInfo animal={animal} />
            </li>
          )
        }}
      </SearchableAnimalList>
      <button
        onClick={close}
        className={styles.done}
      >
        Done
      </button>
    </Modal>
  );
}
