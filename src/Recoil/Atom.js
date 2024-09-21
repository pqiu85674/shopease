import { atom } from "recoil";
import { localStorageEffect } from "./recoilEffects";

const AtomIsSignIn = atom({
  key: "IsSignIn",
  default: false,
});

const AtomIsSignUp = atom({
  key: "IsSignUp",
  default: false,
});

const AtomUserName = atom({
  key: "userName",
  default: "",
  effects: [localStorageEffect("userName")],
});

const AtomIsMember = atom({
  key: "isMember",
  default: false,
  effects: [localStorageEffect("isMember")],
});

const AtomUseIcon = atom({
  key: "useIcon",
  default: false,
});

const AtomProducts = atom({
  key: "products",
  default: [],
});

export {
  AtomIsSignIn,
  AtomIsSignUp,
  AtomUserName,
  AtomIsMember,
  AtomUseIcon,
  AtomProducts,
};
