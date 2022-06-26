export const VALIDATION_NAME_REGEXP = /^([A-Za-zА-Яа-яЁё]{3,30})\s[A-Za-zА-Яа-яЁё]{3,30}$/g;
export const VALIDATION_EMAIL_REGEXP =
  /^[-a-z0-9!#$%&'*+\=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+\=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/;
export const VALIDATION_PHONE_NUMBER_REGEXP = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/; // Focused on Russian mobile and landlines with a 3-digit code
export const VALIDATION_DATE_REGEXP = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;

export const INITIAL_INPUT_DATA_STATE = {
  name: '',
  email: '',
  phoneNumber: '',
  birthDay: '',
  message: '',
};

export const INITIAL_INPUT_ERRORS_STATE = {
  nameError: false,
  emailError: false,
  phoneNumberError: false,
  birthDayError: false,
  messageError: false,
};
