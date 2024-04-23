import { atom } from "recoil";

export const usernameState = atom({
  key: "username",
  default: "",
});

export const emailState = atom({
  key: "email",
  default: "",
});

export const passwordState = atom({
  key: "password",
  default: "",
});

export const errorState = atom({
  key: "error",
  default: "",
});
