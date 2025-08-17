<<<<<<< HEAD
import Cookies from "universal-cookie";

const cookies = new Cookies(null, { path: "/" });

export const setCookie = (name: string, value: object, days: number) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);
  cookies.set(name, value, { expires: expirationDate, secure: true });
};  

export const getCookie = (name: string) => {
  return cookies.get(name);
};

export const removeCookie = (name: string) => {
  cookies.remove(name);
};
=======
import Cookies from "universal-cookie";

const cookies = new Cookies(null, { path: "/" });

export const setCookie = (name: string, value: object, days: number) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);
  cookies.set(name, value, { expires: expirationDate, secure: true });
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};

export const removeCookie = (name: string) => {
  cookies.remove(name);
};
>>>>>>> 3c0518d5f5fb1b6eba28e07cb359177f8d4b8ffc
