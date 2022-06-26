export type FormDataType = {
  name: string;
  email: string;
  phoneNumber: string;
  birthDay: string;
  message: string;
};

export type FormErrorsType = {
  nameError: boolean;
  emailError: boolean;
  phoneNumberError: boolean;
  birthDayError: boolean;
  messageError: boolean;
};
