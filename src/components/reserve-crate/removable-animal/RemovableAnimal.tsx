import React from 'react';
import { FaMinusCircle } from 'react-icons/fa';
import { AnimalDto } from '../../../models/AnimalDto';
import { AnimalInfo } from '../../common/animal/animal-info/AnimalInfo';
import { AnimalPhoto } from '../../common/animal/animal-photo/AnimalPhoto';
import sharedStyles from '../../common/sharedStyles.module.css';
import styles from './RemovableAnimal.module.css';

export type RemovableAnimalProps = {
  animal: AnimalDto;
  remove: () => void;
};

export const RemovableAnimal = ({ animal, remove }: RemovableAnimalProps) => (
  <li
    className={[
      sharedStyles.animalListItem,
      sharedStyles.animalDataContainer,
    ].join(' ')}
  >
    <AnimalPhoto animal={animal} />
    <AnimalInfo animal={animal} />
    <button type="button" onClick={remove} className={styles.removeButton}>
      <FaMinusCircle title="Remove" className={sharedStyles.icon} />
      Remove
    </button>
  </li>
);
