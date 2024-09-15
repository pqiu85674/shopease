import { atom } from "recoil";

const AtomLogin = atom({
  key: "login",
  default: false,
});

const AtomRegister = atom({
  key: "register",
  default: false,
});

export { AtomLogin, AtomRegister };
