import React, { ChangeEvent, Dispatch, useEffect } from 'react';
import { VALIDATION_PHONE_NUMBER_REGEXP } from '../../shared/constants';
import { FormDataType, FormErrorsType } from '../../types/types';
import './PhoneNumber.sass';

interface PhoneNumberProps {
  phoneNumberValue: string;
  phoneNumberError: boolean;
  setFormData: Dispatch<React.SetStateAction<FormDataType>>;
  setInputErrors: Dispatch<React.SetStateAction<FormErrorsType>>;
}

export const PhoneNumber: React.FC<PhoneNumberProps> = ({
  phoneNumberValue,
  phoneNumberError,
  setFormData,
  setInputErrors,
}): JSX.Element => {
  useEffect(() => {
    if (phoneNumberValue.length) {
      phoneNumberValue.match(VALIDATION_PHONE_NUMBER_REGEXP) === null
        ? setInputErrors((prev) => ({ ...prev, phoneNumberError: true }))
        : setInputErrors((prev) => ({ ...prev, phoneNumberError: false }));
    }
  }, [phoneNumberValue, setInputErrors]);

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
        value={phoneNumberValue}
        onChange={handleOnChange}
      />
      <span
        className={
          phoneNumberError
            ? 'ValidationForm-Span_phoneNumber-error'
            : 'ValidationForm-Span_phoneNumber'
        }
      >
        Incorrect phone number(Russian mobile and landlines with a 3-digit code)
      </span>
    </>
  );
};
