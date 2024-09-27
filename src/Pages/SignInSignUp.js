import React from "react";
import {
  AtomIsSignIn,
  AtomIsSignUp,
  AtomUserName,
  AtomIsMember,
} from "../Recoil/Atom";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import Logo from "../images/logo.svg";
import { Input, Space, Button, Divider } from "antd";
import { Link, useNavigate } from "react-router-dom";
import signUp from "../axios/signUp";
import signIn from "../axios/signIn";
import signInClient from "../utils/signInClient";

function SignInSignUp() {
  const isSignIn = useRecoilValue(AtomIsSignIn);
  const isSignUp = useRecoilValue(AtomIsSignUp);
  const setIsMember = useSetRecoilState(AtomIsMember);
  const [userName, setUserName] = useRecoilState(AtomUserName);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const navigate = useNavigate();

  async function handleSignInSignUp() {
    if (isSignIn) {
      if (email.indexOf("@gmail.com") < 1) {
        alert("請輸入正確email");
        setEmail("");
      } else {
        try {
          const response = await signInClient(email, password);
          console.log(response);
          if (response.status === "success") {
            const result = await signIn(response.idToken);
            console.log(result);

            if (result.userName) {
              alert(response.message);
              setIsMember(true);
              setUserName(response.userName);
              navigate("/");
            }
          } else if (response.data.message === "密碼錯誤") {
            alert(response.data.message);
            setPassword("");
          } else if (response.data.message === "帳號不存在") {
            alert(response.data.message);
            setEmail("");
            setPassword("");
          } else if (response.data.message === "無效的憑證") {
            alert(response.data.message);
            setEmail("");
            setPassword("");
          } else {
            alert("其他錯誤");
            console.log("其他錯誤", response.data.message);
            setEmail("");
            setPassword("");
          }
        } catch (error) {
          console.log(error);
        }
      }
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
          console.log("signUp:response", response);
          if (response.data.status === "success") {
            alert(response.data.message);
            setIsMember(true);
            navigate("/");
          } else if (response.data.message === "此電子郵件已經被註冊過") {
            alert(response.data.message);
            setUserName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            navigate("/signIn");
          } else if (response.data.message === "無效的電子郵件格式") {
            alert(response.data.message);
            setEmail("");
          } else if (response.data.message === "密碼強度不足") {
            alert(response.data.message);
            setPassword("");
            setConfirmPassword("");
          } else {
            alert(response.data.message);
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
