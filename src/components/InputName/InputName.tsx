import React, { ChangeEvent, Dispatch, useEffect, useState } from 'react';
import { VALIDATION_NAME_REGEXP } from '../../shared/constants';
import { FormDataType } from '../../types/types';
import './InputName.sass';

interface InputNameProps {
  formData: FormDataType;
  setFormData: Dispatch<React.SetStateAction<FormDataType>>;
}

export const InputName: React.FC<InputNameProps> = ({ formData, setFormData }): JSX.Element => {
  const [isNameError, setIsNameError] = useState(false);

  useEffect(() => {
    if (formData.name.length) {
      formData.name.match(VALIDATION_NAME_REGEXP) === null
        ? setIsNameError(true)
        : setIsNameError(false);
    }
  }, [formData.name]);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev: FormDataType) => ({
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
          isNameError
            ? 'ValidationForm-Span_firstLastNames-error'
            : 'ValidationForm-Span_firstLastNames'
        }
      >
        Incorrect name(first name(3-30 letters) space last name(3-30 letters))
      </span>
    </>
  );
};
