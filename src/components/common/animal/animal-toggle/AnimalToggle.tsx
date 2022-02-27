import React from 'react';
import { AnimalDto } from '../../../../models/AnimalDto';
import { AnimalInfo } from '../animal-info/AnimalInfo';
import { AnimalPhoto } from '../animal-photo/AnimalPhoto';
import styles from './AnimalToggle.module.css';
import sharedStyles from '../../../common/sharedStyles.module.css';
import { FaCheckCircle } from 'react-icons/fa';

export type AnimalToggleProps = {
  animal: AnimalDto;
  checked: boolean;
  toggle: () => void;
}

export const AnimalToggle = ({
  animal,
  checked,
  toggle,
}: AnimalToggleProps) => (
  <li
    key={animal.id}
    onClick={toggle}
    className={[
      sharedStyles.animalListItem,
      sharedStyles.animalDataContainer,
      styles.clickable,
      checked ? styles.selected : '',
    ].join(' ')}
  >
    {checked ? (
      <FaCheckCircle
        className={styles.check}
        title={`${animal.name} (selected)`}
      />
    ) : (
      <AnimalPhoto animal={animal} />
    )}
    <AnimalInfo animal={animal} />
  </li>
);