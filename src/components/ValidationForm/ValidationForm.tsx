import React, { useRef, useState } from 'react';

import { ToastContainer } from 'react-toastify';

import { FormDataType, FormErrorsType } from '../../types/types';
import { INITIAL_INPUT_DATA_STATE, INITIAL_INPUT_ERRORS_STATE } from '../../shared/constants';
import { toastConfig } from '../../shared/toastConfig';
import { notify } from '../../helpers/notify';
import { checkInputsForValidation } from '../../helpers/checkInputsForValidation';
import { DatePicker } from '../DatePicker/DatePicker';
import { InputEmail } from '../InputEmail/InputEmail';
import { InputName } from '../InputName/InputName';
import { MessageArea } from '../MessageArea/MessageArea';
import { PhoneNumber } from '../PhoneNumber/PhoneNumber';

import 'react-toastify/dist/ReactToastify.css';
import './ValidationForm.sass';

export const ValidationForm: React.FC = (): JSX.Element => {
  const [formData, setFormData] = useState<FormDataType>(INITIAL_INPUT_DATA_STATE);
  const [inputErrors, setInputErrors] = useState<FormErrorsType>(INITIAL_INPUT_ERRORS_STATE);
  const inputDateRef = useRef<HTMLInputElement | null>(null);

  const handleClick = async (): Promise<void> => {
    const isInputsValidate = checkInputsForValidation(formData, inputErrors, setInputErrors);

    if (!navigator.onLine) {
      notify('No internet connection', 'error', toastConfig);
      return;
    }
    if (!isInputsValidate) {
      notify('Fill inputs', 'error', toastConfig);
      return;
    }
    try {
      const response = await fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status !== 200) {
        throw new Error(`${response.status} rawResponse.statusText`);
      }
      if (inputDateRef.current !== null) {
        inputDateRef.current.type = 'text';
      }

      notify('sent successfully', 'success', toastConfig);
      setFormData(INITIAL_INPUT_DATA_STATE);
    } catch (error) {
      notify((error as { message: string }).message, 'error', toastConfig);
    }
  };

  return (
    <div className="ValidationForm-Container">
      <InputName
        inputNameValue={formData.name}
        inputNameError={inputErrors.nameError}
        setFormData={setFormData}
        setInputErrors={setInputErrors}
      />
      <InputEmail
        inputEmailValue={formData.email}
        inputEmailError={inputErrors.emailError}
        setFormData={setFormData}
        setInputErrors={setInputErrors}
      />
      <PhoneNumber
        phoneNumberValue={formData.phoneNumber}
        phoneNumberError={inputErrors.phoneNumberError}
        setFormData={setFormData}
        setInputErrors={setInputErrors}
      />
      <DatePicker
        inputDateValue={formData.birthDay}
        inputDateError={inputErrors.birthDayError}
        inputDateRef={inputDateRef}
        setFormData={setFormData}
        setInputErrors={setInputErrors}
      />
      <MessageArea
        messageAreaValue={formData.message}
        messageAreaError={inputErrors.messageError}
        setFormData={setFormData}
        setInputErrors={setInputErrors}
      />
      <input
        className="ValidationForm-Input_submit"
        type="submit"
        value="Send"
        onClick={handleClick}
      />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};
