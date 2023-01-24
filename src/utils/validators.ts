const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm;
const phoneRegex = /^[0-9]{10,10}$/gm;
const dateRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;

export const minPasswordLen = 7;

const passwordRegex = /[\w~@#$%^&*+=`|{}:;!.?"()[\]-]+\d+/gi;

export const isValidEmail = (email: string): boolean => !!email.match(emailRegex);

export const isValidPhoneNumber = (phone: string): boolean => !!phone.match(phoneRegex);

export const isValidUsername =
  (username: string): boolean => Boolean(username.match(/^[^\s]+$/));

export const isValidPassword = (password: string): boolean =>
  ((password.length >= minPasswordLen) && !!password.match(passwordRegex));

export const isValidDate = (date: string) => Boolean(date.match(dateRegex));
