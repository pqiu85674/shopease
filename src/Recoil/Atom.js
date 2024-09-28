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

const AtomUserUid = atom({
  key: "userUid",
  default: "",
  effects: [localStorageEffect("userUid")],
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

const AtomGetAllProductsFromFirebase = atom({
  key: "products",
  default: [],
});

const AtomGetCustomerShopCarFromFirebase = atom({
  key: "shopCar",
  default: [],
});

export {
  AtomIsSignIn,
  AtomIsSignUp,
  AtomUserName,
  AtomUserUid,
  AtomIsMember,
  AtomUseIcon,
  AtomGetAllProductsFromFirebase,
  AtomGetCustomerShopCarFromFirebase,
};
