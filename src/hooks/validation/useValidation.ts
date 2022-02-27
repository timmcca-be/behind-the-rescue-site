import { useState } from 'react';

export type Errors<T extends string> = Record<T, boolean>;

export const useValidation = <T extends string>(currentErrors: Errors<T>) => {
  const errorNames = Object.keys(currentErrors) as T[];

  const [displayedErrors, setDisplayedErrors] = useState(() => {
    const initialErrors: Partial<Errors<T>> = {};
    errorNames.forEach((key) => (initialErrors[key] = false));
    return initialErrors as Record<T, boolean>;
  });

  let areDisplayedErrorsDirty = false;
  const newDisplayedErrors: Partial<Errors<T>> = {};
  for (const name of errorNames) {
    const previousValue = displayedErrors[name];
    // on each render, we check every error that is currently displayed.
    // if it has been resolved, we hide the message.
    // we don't want to start displaying new errors until the user tries to submit again.
    const newValue = displayedErrors[name] && currentErrors[name];
    newDisplayedErrors[name] = newValue;
    if (previousValue !== newValue) {
      areDisplayedErrorsDirty = true;
    }
  }

  if (areDisplayedErrorsDirty) {
    setDisplayedErrors(newDisplayedErrors as Errors<T>);
  }

  const validate = () => {
    const isValid = errorNames.reduce(
      (acc, name) => acc && !currentErrors[name],
      true,
    );

    if (!isValid) {
      setDisplayedErrors(currentErrors);
    }
    return isValid;
  };

  return {
    displayedErrors,
    validate,
  };
};
