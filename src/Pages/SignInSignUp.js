import React from "react";
import {
  AtomIsSignIn,
  AtomIsSignUp,
  AtomUserName,
  AtomIsMember,
} from "../Recoil/Atom";
import { useRecoilValue, useRecoilState } from "recoil";
import Logo from "../images/logo.svg";
import { Input, Space, Button, Divider } from "antd";
import { Link, useNavigate } from "react-router-dom";
import signUp from "../axios/signUp";

function SignInSignUp() {
  const isSignIn = useRecoilValue(AtomIsSignIn);
  const isSignUp = useRecoilValue(AtomIsSignUp);
  const [isMember, setIsMember] = useRecoilState(AtomIsMember);
  const [userName, setUserName] = useRecoilState(AtomUserName);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const navigate = useNavigate();

  async function handleSignInSignUp() {
    if (isSignIn) {
      console.log("login");
    } else if (isSignUp) {
      if (email.indexOf("@gmail.com") < 1) {
        alert("請輸入正確email");
        setEmail("");
      } else if (password !== confirmPassword) {
        alert("兩次密碼輸入不一致");
        setPassword("");
        setConfirmPassword("");
      } else if (password === confirmPassword) {
        try {
          const response = await signUp(email, password, userName);
          if (response === "success") {
            console.log("註冊成功");
            alert("註冊成功");
            setIsMember(true);
            navigate("/");
          } else if (response === "auth/email-already-in-use") {
            alert("此email已經註冊過");
            setUserName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
          } else if (response === "auth/weak-password") {
            alert("密碼過於簡單，請增加密碼複雜度");
            setPassword("");
            setConfirmPassword("");
          } else {
            console.log("其他錯誤:", response);
          }
        } catch (error) {
          console.error("請求失敗:", error);
          alert("發生錯誤，請稍後再試");
        }
      }
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
              {isSignIn && <Link to="/signUp">註冊</Link>}

              {isSignUp && "已經有帳號了嗎？"}
              {isSignUp && <Link to="/signIn">登入</Link>}
            </div>
            {/* <ToastContainer /> */}
          </Space>
        </div>
      </div>
    </div>
  );
}

export default SignInSignUp;
