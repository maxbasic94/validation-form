import React, { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FormDataType } from '../../types/types';
import { DatePicker } from '../DatePicker/DatePicker';
import { InputEmail } from '../InputEmail/InputEmail';
import { InputName } from '../InputName/InputName';
import { MessageArea } from '../MessageArea/MessageArea';
import { PhoneNumber } from '../PhoneNumber/PhoneNumber';
import './ValidationForm.sass';

export const ValidationForm: React.FC = (): JSX.Element => {
  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    email: '',
    phoneNumber: '',
    birthDay: '',
    message: '',
  });
  // const [alarmMessage, setAlarmMessage] = useState('');
  const notify = (message: string) =>
    toast.error(message, {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

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
        setFormData({
          name: '',
          email: '',
          phoneNumber: '',
          birthDay: '',
          message: '',
        });
      } catch (error) {
        notify((error as { message: string }).message);
      }
    } else {
      notify('No internet connection');
    }
  };

  return (
    <div className="ValidationForm-Container">
      <InputName formData={formData} setFormData={setFormData} />
      <InputEmail formData={formData} setFormData={setFormData} />
      <PhoneNumber formData={formData} setFormData={setFormData} />
      <DatePicker formData={formData} setFormData={setFormData} />
      <MessageArea formData={formData} setFormData={setFormData} />
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
