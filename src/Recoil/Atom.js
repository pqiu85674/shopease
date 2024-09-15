import { atom } from "recoil";
import { localStorageEffect } from "./recoilEffects";

const AtomLogin = atom({
  key: "login",
  default: false,
});

const AtomRegister = atom({
  key: "register",
  default: false,
});

const AtomUseName = atom({
  key: "useName",
  default: "",
  effects: [localStorageEffect("useName")],
});

const AtomIsMember = atom({
  key: "isMember",
  default: false,
  effects: [localStorageEffect("isMember")],
});

export { AtomLogin, AtomRegister, AtomUseName, AtomIsMember };
