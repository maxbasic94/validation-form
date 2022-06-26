import React, { ChangeEvent, Dispatch, useEffect } from 'react';
import { VALIDATION_PHONE_NUMBER_REGEXP } from '../../shared/constants';
import { FormDataType, FormErrorsType } from '../../types/types';
import './PhoneNumber.sass';

interface PhoneNumberProps {
  formData: FormDataType;
  setFormData: Dispatch<React.SetStateAction<FormDataType>>;
  inputErrors: FormErrorsType;
  setInputErrors: Dispatch<React.SetStateAction<FormErrorsType>>;
}

export const PhoneNumber: React.FC<PhoneNumberProps> = ({
  formData,
  setFormData,
  inputErrors,
  setInputErrors,
}): JSX.Element => {
  useEffect(() => {
    if (formData.phoneNumber.length) {
      formData.phoneNumber.match(VALIDATION_PHONE_NUMBER_REGEXP) === null
        ? setInputErrors((prev) => ({ ...prev, phoneNumberError: true }))
        : setInputErrors((prev) => ({ ...prev, phoneNumberError: false }));
    }
  }, [formData.phoneNumber, setInputErrors]);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev: FormDataType) => ({
      ...prev,
      phoneNumber: event.target.value,
    }));
  };
  return (
    <>
      <input
        className="ValidationForm-Input_phoneNumber"
        type="tel"
        placeholder="Your Phone Number"
        value={formData.phoneNumber}
        onChange={handleOnChange}
      />
      <span
        className={
          inputErrors.phoneNumberError
            ? 'ValidationForm-Span_phoneNumber-error'
            : 'ValidationForm-Span_phoneNumber'
        }
      >
        Incorrect phone number(Russian mobile and landlines with a 3-digit code)
      </span>
    </>
  );
};
