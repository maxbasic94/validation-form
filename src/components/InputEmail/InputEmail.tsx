import React, { ChangeEvent, Dispatch, useEffect } from 'react';
import { FormDataType, FormErrorsType } from '../../types/types';
import { VALIDATION_EMAIL_REGEXP } from '../../shared/constants';
import './InputEmail.sass';

interface InputEmailProps {
  inputEmailValue: string;
  inputEmailError: boolean;
  setFormData: Dispatch<React.SetStateAction<FormDataType>>;
  setInputErrors: Dispatch<React.SetStateAction<FormErrorsType>>;
}

export const InputEmail: React.FC<InputEmailProps> = ({
  inputEmailValue,
  inputEmailError,
  setFormData,
  setInputErrors,
}): JSX.Element => {
  useEffect(() => {
    if (inputEmailValue.length) {
      inputEmailValue.match(VALIDATION_EMAIL_REGEXP) === null
        ? setInputErrors((prev) => ({ ...prev, emailError: true }))
        : setInputErrors((prev) => ({ ...prev, emailError: false }));
    }
  }, [inputEmailValue, setInputErrors]);

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
        value={inputEmailValue}
        onChange={handleOnChange}
      />
      <span
        className={
          inputEmailError ? 'ValidationForm-Span_email-error' : 'ValidationForm-Span_email'
        }
      >
        Incorrect email(example@gmail.com)
      </span>
    </>
  );
};
