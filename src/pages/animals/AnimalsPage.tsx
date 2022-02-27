import React, { useState } from 'react';
import { AnimalLink } from '../../components/common/animal/animal-link/AnimalLink';
import { SearchableAnimalList } from '../../components/common/animal/searchable-animal-list/SearchableAnimalList';
import { TabList } from '../../components/common/tab-list/TabList';
import { useAnimals } from '../../hooks/api/useAnimals';
import { Species } from '../../models/Species';

export type AnimalsPageProps = {
  species: Species;
};

export const AnimalsPage = ({ species }: AnimalsPageProps) => {
  const [filter, setFilter] = useState('');
  const animals = useAnimals(species).data?.animals;

  return (
    <>
      <h2>Adoptable Animals</h2>
      <TabList
        tabs={[
          {
            id: Species.Dog,
            title: 'Dogs',
            href: '/animals/dogs',
          },
          {
            id: Species.Cat,
            title: 'Cats',
            href: '/animals/cats',
          },
        ]}
        activeTabID={species}
      />
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
