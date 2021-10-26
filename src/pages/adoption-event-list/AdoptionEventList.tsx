import React, { useState } from 'react';
import { AdoptionEventListItem } from '../../components/adoption-event-list/adoption-event-list-item/AdoptionEventListItem';
import { useAdoptionEvents } from '../../hooks/useAdoptionEvents';
import { AdoptionEvent } from '../../models/AdoptionEvent';
import styles from './AdoptionEventList.module.css';

export const AdoptionEventList = () => {
  const { data } = useAdoptionEvents();
  const [filter, setFilter] = useState<string | null>(null);
  const locations = new Set<string>();
  data?.adoptionEvents.forEach((adoptionEvent) => locations.add(adoptionEvent.location));
  let adoptionEvents: AdoptionEvent[] | undefined;
  if (filter) {
    adoptionEvents = data?.adoptionEvents.filter((adoptionEvent) => adoptionEvent.location === filter);
  } else {
    adoptionEvents = data?.adoptionEvents;
  }

  return (
    <>
      <h2 className={styles.title}>Adoption Events</h2>
      <section className={styles.filters}>
        <label>Location:</label>
        {
          Array.from(locations).map((location) => (
            <button
              className={location === filter ? styles.selectedFilterButton : styles.filterButton}
              onClick={() => setFilter(location === filter ? null : location)}
            >
              {location}
            </button>
          ))
        }
        {
          filter && (
            <button
              className={styles.clearFilterButton}
              onClick={() => setFilter(null)}
            >
              Clear filter
            </button>
          )
        }
      </section>
      <ul className={styles.adoptionEvents}>
        {
          adoptionEvents?.map((adoptionEvent) => (
            <AdoptionEventListItem
              adoptionEvent={adoptionEvent}
              key={adoptionEvent.id}
            />
          ))
        }
      </ul>
    </>
  )
}
