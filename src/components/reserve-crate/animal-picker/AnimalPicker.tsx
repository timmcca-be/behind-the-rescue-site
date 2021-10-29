import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useAvailableAnimals } from '../../../hooks/useAvailableAnimals';
import { AnimalDto } from '../../../models/AnimalDto';
import { Species } from '../../../models/Species';
import { AnimalInfo } from '../../common/animal-info/AnimalInfo';
import { AnimalPhoto } from '../../common/animal-photo/AnimalPhoto';
import styles from './AnimalPicker.module.css';
import sharedStyles from '../../common/sharedStyles.module.css';
import { FaCheckCircle } from 'react-icons/fa';

export type AnimalPickerProps = {
  isOpen: boolean;
  species: Species;
  date: string;
  animals: AnimalDto[];
  setAnimals: Dispatch<SetStateAction<AnimalDto[]>>;
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
  animals,
  setAnimals,
  close,
}: AnimalPickerProps) => {
  const { data } = useAvailableAnimals(species, date);
  const [filter, setFilter] = useState('');

  useEffect(() => setFilter(''), [isOpen]);

  const filteredAnimals = data?.animals
    .filter((animal) => animal.name.toLowerCase().startsWith(filter.toLowerCase()));
  
  const selectedAnimalIDs = new Set(animals.map((animal) => animal.id));
  
  const addAnimal = (animal: AnimalDto) => setAnimals((animals) => animals.concat([animal]));
  const removeAnimal = (animalID: number) => setAnimals((animals) => animals.filter((animal) => animal.id !== animalID))

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={close}
      style={modalStyles}
    >
      <label className={styles.filter}>
        Filter animals:{' '}
        <input
          type="text"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
      </label>
      <ul className={[
        sharedStyles.list,
        styles.animals,
      ].join(' ')}>
        {filteredAnimals?.map((animal) => {
          const isSelected = selectedAnimalIDs.has(animal.id);
          const onClick = isSelected ? () => removeAnimal(animal.id) : () => addAnimal(animal);
          
          return (
            <li
              key={animal.id}
              onClick={onClick}
              className={[
                sharedStyles.animalListItem,
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
        })}
      </ul>
      <button
        onClick={close}
        className={styles.done}
      >
        Done
      </button>
    </Modal>
  );
}
