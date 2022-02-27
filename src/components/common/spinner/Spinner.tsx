import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import styles from './Spinner.module.css';

export type SpinnerProps = {
  title?: string;
};

export const Spinner = ({ title }: SpinnerProps) => (
  <FaSpinner title={title} className={styles.spinner} />
);
