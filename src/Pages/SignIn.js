import React from "react";
import Header from "../components/layout/Header";
import SignInSignUp from "./SignInSignUp";
import {
  AtomGetCustomerShopCarFromFirebase,
  AtomUserName,
  AtomUserUid,
} from "../Recoil/Atom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import updateShopCarClient from "../utils/updateShopCarClient";

function SignIn() {
  const setShopCar = useSetRecoilState(AtomGetCustomerShopCarFromFirebase);
  const userName = useRecoilValue(AtomUserName);
  const userUid = useRecoilValue(AtomUserUid);

  React.useEffect(() => {
    updateShopCarClient(userUid, setShopCar);
  }, [setShopCar, userName]);

  return (
    <div>
      <Header></Header>
      <SignInSignUp></SignInSignUp>
    </div>
  );
}

export default SignIn;
