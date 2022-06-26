import React, { Dispatch, useEffect } from 'react';
import { VALIDATION_DATE_REGEXP } from '../../shared/constants';
import { FormDataType, FormErrorsType } from '../../types/types';
import './DatePicker.sass';

interface DatePickerProps {
  formData: FormDataType;
  setFormData: Dispatch<React.SetStateAction<FormDataType>>;
  inputErrors: FormErrorsType;
  setInputErrors: Dispatch<React.SetStateAction<FormErrorsType>>;
  inputDateRef: React.LegacyRef<HTMLInputElement>;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  formData,
  setFormData,
  inputErrors,
  setInputErrors,
  inputDateRef,
}): JSX.Element => {
  useEffect(() => {
    if (formData.birthDay.length) {
      formData.birthDay.match(VALIDATION_DATE_REGEXP) === null
        ? setInputErrors((prev) => ({ ...prev, birthDayError: true }))
        : setInputErrors((prev) => ({ ...prev, birthDayError: false }));
    }
  }, [formData.birthDay, setInputErrors]);

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
        value={formData.birthDay}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
        onKeyDown={(e) => e.preventDefault()}
        ref={inputDateRef}
      />
      <span
        className={
          inputErrors.birthDayError ? 'ValidationForm-Span_date-error' : 'ValidationForm-Span_date'
        }
      >
        Date is not selected
      </span>
    </>
  );
};
