import { useState } from 'react';

export type Errors<T extends string> = Partial<Record<T, boolean>>;

export const useValidation = <T extends string>(currentErrors: Errors<T>) => {
  const errorNames = Object.keys(currentErrors) as T[];

  const [displayedErrors, setDisplayedErrors] = useState(() => {
    const initialErrors: Errors<T> = {};
    errorNames.forEach((key) => initialErrors[key] = false);
    return initialErrors;
  });

  let areDisplayedErrorsDirty = false;
  const newDisplayedErrors: Errors<T> = {};
  for (const name of errorNames) {
    const previousValue = displayedErrors[name];
    const newValue = displayedErrors[name] && currentErrors[name];
    displayedErrors[name] = newValue;
    if (previousValue !== displayedErrors[name]) {
      areDisplayedErrorsDirty = true;
    }
  }

  if (areDisplayedErrorsDirty) {
    setDisplayedErrors(newDisplayedErrors);
  }
  
  const validate = () => {
    const isValid = errorNames
      .reduce((acc, name) => acc && !currentErrors[name], true);

    if (!isValid) {
      setDisplayedErrors(currentErrors);
    }
    return isValid;
  };

  return {
    displayedErrors,
    validate,
  };
}
