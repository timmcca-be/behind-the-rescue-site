import React, { useState } from 'react';
import { AnimalLink } from '../../components/common/animal/animal-link/AnimalLink';
import { SearchableAnimalList } from '../../components/common/animal/searchable-animal-list/SearchableAnimalList';
import { useAllAnimals } from '../../hooks/useAllAnimals';

export const AnimalList = () => {
  const animals = useAllAnimals().data?.animals;
  const [filter, setFilter] = useState('');

  return (
    <>
      <h2>Adoptable Animals</h2>
      <SearchableAnimalList
        animals={animals}
        filter={filter}
        setFilter={setFilter}
      >
        {(animal) => <AnimalLink animal={animal} />}
      </SearchableAnimalList>
    </>
  );
};
