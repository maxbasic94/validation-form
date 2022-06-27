import React, { Dispatch, useEffect } from 'react';
import { FormDataType, FormErrorsType } from '../../types/types';
import { VALIDATION_DATE_REGEXP } from '../../shared/constants';
import './DatePicker.sass';

interface DatePickerProps {
  inputDateValue: string;
  inputDateError: boolean;
  inputDateRef: React.LegacyRef<HTMLInputElement>;
  setFormData: Dispatch<React.SetStateAction<FormDataType>>;
  setInputErrors: Dispatch<React.SetStateAction<FormErrorsType>>;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  inputDateValue,
  inputDateError,
  inputDateRef,
  setFormData,
  setInputErrors,
}): JSX.Element => {
  useEffect(() => {
    if (inputDateValue.length) {
      inputDateValue.match(VALIDATION_DATE_REGEXP) === null
        ? setInputErrors((prev) => ({ ...prev, birthDayError: true }))
        : setInputErrors((prev) => ({ ...prev, birthDayError: false }));
    }
  }, [inputDateValue, setInputErrors]);

  const handleOnFocus = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    event.target.type = 'date';
  };

  const handleOnBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    !event.target.value && setInputErrors((prev) => ({ ...prev, birthDayError: true }));
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
        value={inputDateValue}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
        onKeyDown={(e) => e.preventDefault()}
        ref={inputDateRef}
      />
      <span
        className={inputDateError ? 'ValidationForm-Span_date-error' : 'ValidationForm-Span_date'}
      >
        Date is not selected
      </span>
    </>
  );
};
