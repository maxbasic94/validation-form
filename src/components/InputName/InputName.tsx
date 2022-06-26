import React, { ChangeEvent, Dispatch, useEffect } from 'react';
import { VALIDATION_NAME_REGEXP } from '../../shared/constants';
import { FormDataType, FormErrorsType } from '../../types/types';
import './InputName.sass';

interface InputNameProps {
  formData: FormDataType;
  setFormData: Dispatch<React.SetStateAction<FormDataType>>;
  inputErrors: FormErrorsType;
  setInputErrors: Dispatch<React.SetStateAction<FormErrorsType>>;
}

export const InputName: React.FC<InputNameProps> = ({
  formData,
  setFormData,
  inputErrors,
  setInputErrors,
}): JSX.Element => {
  useEffect(() => {
    if (formData.name.length) {
      formData.name.match(VALIDATION_NAME_REGEXP) === null
        ? setInputErrors((prev) => ({ ...prev, nameError: true }))
        : setInputErrors((prev) => ({ ...prev, nameError: false }));
    }
  }, [formData.name, setInputErrors]);

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
        value={formData.name}
        onChange={handleOnChange}
      />
      <span
        className={
          inputErrors.nameError
            ? 'ValidationForm-Span_firstLastNames-error'
            : 'ValidationForm-Span_firstLastNames'
        }
      >
        Incorrect name(first name(3-30 letters) space last name(3-30 letters))
      </span>
    </>
  );
};
