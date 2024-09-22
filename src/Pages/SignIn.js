import React from "react";
import Header from "../components/layout/Header";
import SignInSignUp from "./SignInSignUp";
import customerShopCar from "../axios/CustomerShopCar";
import {
  AtomGetCustomerShopCarFromFirebase,
  AtomUserName,
} from "../Recoil/Atom";
import { useSetRecoilState, useRecoilValue } from "recoil";

function SignIn() {
  const setShopCar = useSetRecoilState(AtomGetCustomerShopCarFromFirebase);
  const userName = useRecoilValue(AtomUserName);

  React.useEffect(() => {
    async function fetchShopCar() {
      const response = await customerShopCar(userName);
      setShopCar(
        Object.entries(response.data).map((element) => {
          return element;
        })
      );
    }
    fetchShopCar();
  }, [setShopCar, userName]);

  return (
    <div>
      <Header></Header>
      <SignInSignUp></SignInSignUp>
    </div>
  );
}

export default SignIn;
