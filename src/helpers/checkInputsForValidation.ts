import { Dispatch } from 'react';
import {
  VALIDATION_DATE_REGEXP,
  VALIDATION_EMAIL_REGEXP,
  VALIDATION_NAME_REGEXP,
  VALIDATION_PHONE_NUMBER_REGEXP,
} from '../shared/constants';
import { FormDataType, FormErrorsType } from '../types/types';

export const checkInputsForValidation = (
  formData: FormDataType,
  inputErrors: FormErrorsType,
  setInputErrors: Dispatch<React.SetStateAction<FormErrorsType>>
): boolean => {
  const isEveryInputFilled = Object.values(formData).every((item) => item !== '');
  const isNotErrors = Object.values(inputErrors).every((item) => item === false);

  if (isEveryInputFilled && isNotErrors) {
    return true;
  }
  setInputErrors({
    nameError: formData.name.match(VALIDATION_NAME_REGEXP) === null ? true : false,
    emailError: formData.email.match(VALIDATION_EMAIL_REGEXP) === null ? true : false,
    phoneNumberError:
      formData.phoneNumber.match(VALIDATION_PHONE_NUMBER_REGEXP) === null ? true : false,
    birthDayError: formData.birthDay.match(VALIDATION_DATE_REGEXP) === null ? true : false,
    messageError: formData.message.length <= 10 || formData.message.length >= 300 ? true : false,
  });
  return false;
};
