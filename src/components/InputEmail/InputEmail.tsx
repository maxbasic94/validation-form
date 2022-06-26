import React, { ChangeEvent, Dispatch, useEffect, useState } from 'react';
import { VALIDATION_EMAIL_REGEXP } from '../../shared/constants';
import { FormDataType } from '../../types/types';
import './InputEmail.sass';

interface InputEmailProps {
  formData: FormDataType;
  setFormData: Dispatch<React.SetStateAction<FormDataType>>;
}

export const InputEmail: React.FC<InputEmailProps> = ({ formData, setFormData }): JSX.Element => {
  const [isEmailError, setIsEmailError] = useState(false);

  useEffect(() => {
    if (formData.email.length) {
      formData.email.match(VALIDATION_EMAIL_REGEXP) === null
        ? setIsEmailError(true)
        : setIsEmailError(false);
    }
  }, [formData.email]);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev: FormDataType) => ({
      ...prev,
      email: event.target.value,
    }));
  };
  return (
    <>
      <input
        className="ValidationForm-Input_email"
        type="text"
        placeholder="Your Email Address"
        value={formData.email}
        onChange={handleOnChange}
      />
      <span
        className={isEmailError ? 'ValidationForm-Span_email-error' : 'ValidationForm-Span_email'}
      >
        Incorrect email(example@gmail.com)
      </span>
    </>
  );
};
