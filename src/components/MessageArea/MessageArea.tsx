import React, { ChangeEvent, Dispatch, useEffect, useState } from 'react';
import { FormDataType } from '../../types/types';
import './MessageArea.sass';

interface MessageAreaProps {
  formData: FormDataType;
  setFormData: Dispatch<React.SetStateAction<FormDataType>>;
}

export const MessageArea: React.FC<MessageAreaProps> = ({ formData, setFormData }): JSX.Element => {
  const [textAreaError, setTextAreaError] = useState(false);

  useEffect(() => {
    const messageLength = formData.message.length;
    messageLength && (messageLength <= 10 || messageLength >= 300)
      ? setTextAreaError(true)
      : setTextAreaError(false);
  }, [formData.message]);

  const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev: FormDataType) => ({
      ...prev,
      message: event.target.value,
    }));
  };

  return (
    <>
      <textarea
        className="ValidationForm-TextArea_message"
        placeholder="Type your message Here..."
        onChange={handleOnChange}
        value={formData.message}
      ></textarea>
      <span
        className={
          textAreaError ? 'ValidationForm-Span_message-error' : 'ValidationForm-Span_message'
        }
      >
        Message must be between 10 and 300 characters long
      </span>
    </>
  );
};
