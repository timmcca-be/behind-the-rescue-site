import React, { Fragment, ReactElement } from 'react';
import { AnimalDto } from '../../../../models/AnimalDto';
import styles from './SearchableAnimalList.module.css';
import sharedStyles from '../../sharedStyles.module.css';
import { Spinner } from '../../spinner/Spinner';

export type SearchableAnimalListProps = {
  animals?: AnimalDto[];
  children: (animal: AnimalDto) => ReactElement;
  filter: string;
  setFilter: (value: string) => void;
}

export const SearchableAnimalList = ({
  animals,
  children: createChild,
  filter,
  setFilter,
}: SearchableAnimalListProps) => (
  <>
    <label className={styles.filter}>
      Filter:{' '}
      <input
        type="text"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      />
    </label>
    {animals ? (
      <ul className={[
        sharedStyles.list,
        styles.animals,
      ].join(' ')}>
        {animals
          .filter((animal) => animal.name.toLowerCase().startsWith(filter.toLowerCase()))
          .map((animal) => (
            <Fragment key={animal.id}>
              {createChild(animal)}
            </Fragment>
          ))
        }
      </ul>
    ) : <Spinner />}
  </>
);
