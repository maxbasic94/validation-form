import React, { useRef, useState } from 'react';

import { ToastContainer } from 'react-toastify';

import { INITIAL_INPUT_DATA_STATE, INITIAL_INPUT_ERRORS_STATE } from '../../shared/constants';
import { toastConfig } from '../../shared/toastConfig';
import { FormDataType, FormErrorsType } from '../../types/types';
import { notify } from '../../helpers/notify';
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
    if (navigator.onLine) {
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
        notify('sent successfully', 'success', toastConfig);
        if (inputDateRef.current !== null) {
          inputDateRef.current.type = 'text';
        }
        setFormData({
          name: '',
          email: '',
          phoneNumber: '',
          birthDay: '',
          message: '',
        });
      } catch (error) {
        notify((error as { message: string }).message, 'error', toastConfig);
      }
    } else {
      notify('No internet connection', 'error', toastConfig);
    }
  };

  return (
    <div className="ValidationForm-Container">
      <InputName
        formData={formData}
        setFormData={setFormData}
        inputErrors={inputErrors}
        setInputErrors={setInputErrors}
      />
      <InputEmail
        formData={formData}
        setFormData={setFormData}
        inputErrors={inputErrors}
        setInputErrors={setInputErrors}
      />
      <PhoneNumber
        formData={formData}
        setFormData={setFormData}
        inputErrors={inputErrors}
        setInputErrors={setInputErrors}
      />
      <DatePicker
        formData={formData}
        setFormData={setFormData}
        inputErrors={inputErrors}
        setInputErrors={setInputErrors}
        inputDateRef={inputDateRef}
      />
      <MessageArea
        formData={formData}
        setFormData={setFormData}
        inputErrors={inputErrors}
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
