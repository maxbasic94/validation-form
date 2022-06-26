import React, { ChangeEvent, Dispatch, useEffect } from 'react';
import { FormDataType, FormErrorsType } from '../../types/types';
import './MessageArea.sass';

interface MessageAreaProps {
  formData: FormDataType;
  setFormData: Dispatch<React.SetStateAction<FormDataType>>;
  inputErrors: FormErrorsType;
  setInputErrors: Dispatch<React.SetStateAction<FormErrorsType>>;
}

export const MessageArea: React.FC<MessageAreaProps> = ({
  formData,
  setFormData,
  inputErrors,
  setInputErrors,
}): JSX.Element => {
  useEffect(() => {
    const messageLength = formData.message.length;
    messageLength && (messageLength <= 10 || messageLength >= 300)
      ? setInputErrors((prev) => ({ ...prev, messageError: true }))
      : setInputErrors((prev) => ({ ...prev, messageError: false }));
  }, [formData.message, setInputErrors]);

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
          inputErrors.messageError
            ? 'ValidationForm-Span_message-error'
            : 'ValidationForm-Span_message'
        }
      >
        Message must be between 10 and 300 characters long
      </span>
    </>
  );
};
