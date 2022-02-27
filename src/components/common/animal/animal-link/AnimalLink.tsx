import React from 'react';
import { Link } from 'react-router-dom';
import { AnimalDto } from '../../../../models/AnimalDto';
import { AnimalInfo } from '../animal-info/AnimalInfo';
import { AnimalPhoto } from '../animal-photo/AnimalPhoto';
import styles from './AnimalLink.module.css';
import sharedStyles from '../../sharedStyles.module.css';

export type AnimalLinkProps = {
  animal: AnimalDto;
};

export const AnimalLink = ({ animal }: AnimalLinkProps) => (
  <Link
    to={`/animals/${animal.id}`}
    className={[sharedStyles.animalDataContainer, styles.animalLink].join(' ')}
  >
    <AnimalPhoto animal={animal} />
    <AnimalInfo animal={animal} />
  </Link>
);
