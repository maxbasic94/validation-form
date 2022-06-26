import React, { ChangeEvent, Dispatch, useEffect } from 'react';
import { FormDataType, FormErrorsType } from '../../types/types';
import { VALIDATION_EMAIL_REGEXP } from '../../shared/constants';
import './InputEmail.sass';

interface InputEmailProps {
  formData: FormDataType;
  setFormData: Dispatch<React.SetStateAction<FormDataType>>;
  inputErrors: FormErrorsType;
  setInputErrors: Dispatch<React.SetStateAction<FormErrorsType>>;
}

export const InputEmail: React.FC<InputEmailProps> = ({
  formData,
  setFormData,
  inputErrors,
  setInputErrors,
}): JSX.Element => {
  useEffect(() => {
    if (formData.email.length) {
      formData.email.match(VALIDATION_EMAIL_REGEXP) === null
        ? setInputErrors((prev) => ({ ...prev, emailError: true }))
        : setInputErrors((prev) => ({ ...prev, emailError: false }));
    }
  }, [formData.email, setInputErrors]);

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
        className={
          inputErrors.emailError ? 'ValidationForm-Span_email-error' : 'ValidationForm-Span_email'
        }
      >
        Incorrect email(example@gmail.com)
      </span>
    </>
  );
};
