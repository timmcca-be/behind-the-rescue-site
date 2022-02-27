import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import sharedStyles from '../sharedStyles.module.css';
import styles from './NotFullyVaccinatedWarning.module.css';

export const NotFullyVaccinatedWarning = () => (
  <span className={[sharedStyles.iconData, styles.warning].join(' ')}>
    <FaExclamationTriangle title="Crate size" className={sharedStyles.icon} />
    Not fully vaccinated
  </span>
);
