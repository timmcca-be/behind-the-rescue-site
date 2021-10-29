import React from 'react';
import { useParams } from 'react-router';
import { useAnimalDetails } from '../../hooks/useAnimalDetails';
import { FaBirthdayCake, FaCat, FaDna, FaDog, FaUser } from 'react-icons/fa';
import { Species } from '../../models/Species';
import { Sex } from '../../models/Sex';
import styles from './Animal.module.css';
import sharedStyles from '../../components/common/sharedStyles.module.css';

export type AnimalParams = {
  animalID: string;
}

const formatSex = (sex: Sex) => `${sex[0]}${sex.substring(1).toLowerCase()}`;

const decodeHtmlEntities = (input: string) =>
  input
    .split('<br/>')
    .filter((paragraph) => paragraph.trim() !== '')
    .map((paragraph) => {
      const doc = new DOMParser().parseFromString(paragraph, "text/html");
      return doc.documentElement.textContent;
    });

export const Animal = () => {
  const params = useParams<AnimalParams>();
  const animalID = Number.parseInt(params.animalID);

  const animal = useAnimalDetails(animalID).data?.animal;

  if (animal === undefined) {
    return null;
  }

  const yearsOld = Math.floor(animal.monthsOld / 12);
  const monthsOld = animal.monthsOld % 12;

  const iconDataClass = [
    sharedStyles.iconData,
    styles.iconData,
  ].join(' ')

  return (
    <>
      <h1 className={styles.title}>{animal.name}</h1>
      <section className={styles.summary}>
        <img
          alt={animal.name}
          src={animal.photoLinks[0]}
          className={styles.photo}
        />
        <section>
          <span className={iconDataClass}>
            <FaUser title="Foster" className={sharedStyles.icon} />
            Staying with {animal.foster}
          </span>
          <span className={iconDataClass}>
            {animal.species === Species.Cat ? (
              <FaCat title="Species and sex" className={sharedStyles.icon} />
            ) : (
              <FaDog title="Species and sex" className={sharedStyles.icon} />
            )}
            {formatSex(animal.sex)} {animal.species.toLowerCase()}
          </span>
          <span className={iconDataClass}>
            <FaBirthdayCake title="Age" className={sharedStyles.icon} />
            {yearsOld > 0 && `${yearsOld} years`}
            {yearsOld > 0 && monthsOld > 0 && ', '}
            {monthsOld > 0 && `${monthsOld} months`}
            {' '}old
          </span>
          <span className={iconDataClass}>
            <FaDna title="Breed" className={sharedStyles.icon} />
            {animal.breed}
          </span>
        </section>
      </section>
      {decodeHtmlEntities(animal.description).map((paragraph) => (
        <p className={styles.description}>
          {paragraph}
        </p>
      ))}
    </>
  );
}
