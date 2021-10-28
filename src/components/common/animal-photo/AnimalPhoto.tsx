import React from 'react';
import { AnimalDto } from '../../../models/AnimalDto';
import styles from './AnimalPhoto.module.css';

export type AnimalPhotoProps = {
  animal: AnimalDto;
}

export const AnimalPhoto = ({ animal }: AnimalPhotoProps) => (
  <img
    src={animal.photoLink}
    alt={animal.name}
    className={styles.animalPhoto}
  />
);
