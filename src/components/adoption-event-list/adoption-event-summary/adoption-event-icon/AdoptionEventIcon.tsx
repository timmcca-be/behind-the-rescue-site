import React from 'react';
import { AdoptionEventDto } from '../../../../models/AdoptionEventDto';
import { Species } from '../../../../models/Species';
import styles from './AdoptionEventIcon.module.css';
import catPaw from './cat_paw.svg';
import dogPaw from './dog_paw.svg';

export type AdoptionEventIconProps = {
  adoptionEvent: AdoptionEventDto;
}

const getLocationColor = (location: string) => {
  switch (location) {
    case '5MP':
      return '#be34b0';
    case 'OPS':
      return '#4aaa6b';
    case 'CSP':
      return '#136aa9';
    case 'WP':
      return '#88b800';
    case 'PSPD':
      return '#994a29';
    default:
      return '#555';
  }
}

export const AdoptionEventIcon = ({ adoptionEvent }: AdoptionEventIconProps) => (
  <section
    className={styles.icon}
    style={{
      backgroundColor: getLocationColor(adoptionEvent.location),
    }}
  >
    <img
      src={adoptionEvent.availableSpecies === Species.Cat ? catPaw : dogPaw}
      alt=""
      className={styles.paw}
    />
    <p className={styles.location}>{adoptionEvent.location}</p>
  </section>
)
