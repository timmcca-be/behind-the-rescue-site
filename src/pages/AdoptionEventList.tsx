import React from 'react';
import { Link } from 'react-router-dom';
import { useAdoptionEvents } from '../hooks/useAdoptionEvents';

export const AdoptionEventList = () => {
  const { data } = useAdoptionEvents();
  return (
    <ul>
      {
        data?.adoptionEvents.map((adoptionEvent) => (
          <li key={adoptionEvent.id}>
            <p>
              <Link to={`/adoption-events/${adoptionEvent.id}`}>{adoptionEvent.name}</Link>
            </p>
            <p>{adoptionEvent.dayOfWeek}</p>
          </li>
        ))
      }
    </ul>
  )
}
