import React, { ChangeEvent, Dispatch, useEffect } from 'react';
import { VALIDATION_NAME_REGEXP } from '../../shared/constants';
import { FormDataType, FormErrorsType } from '../../types/types';
import './InputName.sass';

interface InputNameProps {
  inputNameValue: string;
  inputNameError: boolean;
  setFormData: Dispatch<React.SetStateAction<FormDataType>>;
  setInputErrors: Dispatch<React.SetStateAction<FormErrorsType>>;
}

export const InputName: React.FC<InputNameProps> = ({
  inputNameValue,
  inputNameError,
  setFormData,
  setInputErrors,
}): JSX.Element => {
  useEffect(() => {
    if (inputNameValue.length) {
      inputNameValue.match(VALIDATION_NAME_REGEXP) === null
        ? setInputErrors((prev) => ({ ...prev, nameError: true }))
        : setInputErrors((prev) => ({ ...prev, nameError: false }));
    }
  }, [inputNameValue, setInputErrors]);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      name: event.target.value.toLocaleUpperCase(),
    }));
  };

  return (
    <>
      <input
        className="ValidationForm-Input_firstLastNames"
        type="text"
        placeholder="You first and last name"
        value={inputNameValue}
        onChange={handleOnChange}
      />
      <span
        className={
          inputNameError
            ? 'ValidationForm-Span_firstLastNames-error'
            : 'ValidationForm-Span_firstLastNames'
        }
      >
        Incorrect name(first name(3-30 letters) space last name(3-30 letters))
      </span>
    </>
  );
};
