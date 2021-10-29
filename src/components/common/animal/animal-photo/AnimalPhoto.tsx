import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { AnimalDto } from '../../../../models/AnimalDto';
import styles from './AnimalPhoto.module.css';

export type AnimalPhotoProps = {
  animal: AnimalDto;
}

export const AnimalPhoto = ({ animal }: AnimalPhotoProps) => (
  <LazyLoadImage
    src={animal.photoLink}
    alt={animal.name}
    className={styles.animalPhoto}
  />
);
