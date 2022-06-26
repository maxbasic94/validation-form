import React, { Dispatch, useEffect, useState } from 'react';
import { VALIDATION_DATE_REGEXP } from '../../shared/constants';
import { FormDataType } from '../../types/types';
import './DatePicker.sass';

interface DatePickerProps {
  formData: FormDataType;
  setFormData: Dispatch<React.SetStateAction<FormDataType>>;
}

export const DatePicker: React.FC<DatePickerProps> = ({ formData, setFormData }): JSX.Element => {
  const [isDatePickerError, setIsDatePickerError] = useState(false);

  useEffect(() => {
    if (formData.birthDay.length) {
      formData.birthDay.match(VALIDATION_DATE_REGEXP) === null
        ? setIsDatePickerError(true)
        : setIsDatePickerError(false);
    }
  }, [formData.birthDay]);

  const handleOnFocus = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    event.target.type = 'date';
  };

  const handleOnBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    !event.target.value && setIsDatePickerError(true);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev: FormDataType) => ({
      ...prev,
      birthDay: event.target.value,
    }));
  };

  return (
    <>
      <input
        className="ValidationForm-Input_date"
        type="text"
        placeholder="Your Birthday"
        required
        value={formData.birthDay}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
        onKeyDown={(e) => e.preventDefault()}
      />
      <span
        className={
          isDatePickerError ? 'ValidationForm-Span_date-error' : 'ValidationForm-Span_date'
        }
      >
        Date is not selected
      </span>
    </>
  );
};
