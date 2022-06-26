import React, { ChangeEvent, Dispatch, useEffect, useState } from 'react';
import { VALIDATION_PHONE_NUMBER_REGEXP } from '../../shared/constants';
import { FormDataType } from '../../types/types';
import './PhoneNumber.sass';

interface PhoneNumberProps {
  formData: FormDataType;
  setFormData: Dispatch<React.SetStateAction<FormDataType>>;
}

export const PhoneNumber: React.FC<PhoneNumberProps> = ({ formData, setFormData }): JSX.Element => {
  const [isPhoneNumberError, setIsPhoneNumberError] = useState(false);

  useEffect(() => {
    if (formData.phoneNumber.length) {
      formData.phoneNumber.match(VALIDATION_PHONE_NUMBER_REGEXP) === null
        ? setIsPhoneNumberError(true)
        : setIsPhoneNumberError(false);
    }
  }, [formData.phoneNumber]);

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
          isPhoneNumberError
            ? 'ValidationForm-Span_phoneNumber-error'
            : 'ValidationForm-Span_phoneNumber'
        }
      >
        Incorrect phone number(Russian mobile and landlines with a 3-digit code)
      </span>
    </>
  );
};
