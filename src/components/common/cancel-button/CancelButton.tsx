import React from 'react';
import styles from './CancelButton.module.css';
import sharedStyles from '../sharedStyles.module.css';
import { FaTimes } from 'react-icons/fa';

export type CancelButtonProps = {
  confirmationMessage: string;
  onCancel: () => void;
};

export const CancelButton = ({
  confirmationMessage,
  onCancel,
}: CancelButtonProps) => {
  const onClick = () => {
    if (window.confirm(confirmationMessage)) {
      onCancel();
    }
  };

  return (
    <button
      className={[styles.cancelButton, sharedStyles.clickable].join(' ')}
      onClick={onClick}
    >
      <FaTimes title="Cancel" />
    </button>
  );
};
