import React from "react";
import Header from "../components/layout/Header";
import SignInSignUp from "./SignInSignUp";
import {
  AtomGetCustomerShopCarFromFirebase,
  AtomUserName,
} from "../Recoil/Atom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import updateShopCarClient from "../utils/updateShopCarClient";

function SignIn() {
  const setShopCar = useSetRecoilState(AtomGetCustomerShopCarFromFirebase);
  const userName = useRecoilValue(AtomUserName);

  React.useEffect(() => {
    updateShopCarClient(userName, setShopCar);
  }, [setShopCar, userName]);

  return (
    <div>
      <Header></Header>
      <SignInSignUp></SignInSignUp>
    </div>
  );
}

export default SignIn;
