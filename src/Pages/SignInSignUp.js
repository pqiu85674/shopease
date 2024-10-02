import React from "react";
import {
  AtomIsSignIn,
  AtomIsSignUp,
  AtomUserName,
  AtomUserUid,
  AtomIsMember,
} from "../Recoil/Atom";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import Logo from "../images/logo.svg";
import { Input, Space, Button, Divider } from "antd";
import { Link, useNavigate } from "react-router-dom";
import handleSignIn from "../utils/handleSignIn";
import handleSignUp from "../utils/handleSignUp";

function SignInSignUp() {
  const isSignIn = useRecoilValue(AtomIsSignIn);
  const isSignUp = useRecoilValue(AtomIsSignUp);
  const setIsMember = useSetRecoilState(AtomIsMember);
  const [userName, setUserName] = useRecoilState(AtomUserName);
  const setUserUid = useSetRecoilState(AtomUserUid);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const navigate = useNavigate();

  function handleSignInSignUp() {
    if (email.indexOf("@gmail.com") < 1) {
      alert("請輸入正確email");
      setEmail("");
      return;
    }
    if (isSignUp) {
      handleSignUp(
        userName,
        email,
        password,
        confirmPassword,
        setUserUid,
        setUserName,
        setEmail,
        setIsMember,
        setPassword,
        setConfirmPassword,
        navigate
      );
    } else if (isSignIn) {
      handleSignIn(
        email,
        password,
        setIsMember,
        setUserUid,
        setEmail,
        setUserName,
        setPassword,
        navigate
      );
    }
  }

  return (
    <div>
      <div className="flex justify-around items-center bg-neutral-300 w-full px-40">
        <div>
          <img src={Logo} alt="Logo" className="block w-80 h-80 " />
          <div className="text-center text-4xl text-neutral-600 font-bold">
            購物平台
          </div>
        </div>
        <div className="p-4 w-80 bg-neutral-100 my-20 shadow-xl rounded-lg">
          <div className="m-4 w-36 block">
            {isSignIn && "登入"}
            {isSignUp && "註冊"}
          </div>

          <Space direction="vertical" size="large" className="w-full">
            <Input
              placeholder="userName"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSignInSignUp();
                }
              }}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              value={userName}
              className={`${isSignUp ? "inline-flex" : "hidden"}`}
            />
            <Input
              placeholder="email"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSignInSignUp();
                }
              }}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
            <Input.Password
              placeholder="password"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSignInSignUp();
                }
              }}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
            <Input.Password
              placeholder="confirm password"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSignInSignUp();
                }
              }}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              className={`${isSignUp ? "inline-flex" : "hidden"}`}
              value={confirmPassword}
            />
            <Button
              type="primary"
              block
              className="mt-4"
              onClick={() => {
                handleSignInSignUp();
                // console.log("test");
              }}
            >
              {isSignIn && "登入"}
              {isSignUp && "註冊"}
            </Button>
            <Divider className="my-1" />
            <div className="text-center mr-4">
              {isSignIn && "新朋友？"}
              {isSignIn && (
                <Link to="/signUp" className="text-neutral-400">
                  註冊
                </Link>
              )}

              {isSignUp && "已經有帳號了嗎？"}
              {isSignUp && (
                <Link to="/signIn" className="text-neutral-400">
                  登入
                </Link>
              )}
            </div>
            {/* <ToastContainer /> */}
          </Space>
        </div>
      </div>
    </div>
  );
}

export default SignInSignUp;
