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
import signUp from "../axios/signUp";
import signIn from "../axios/signIn";
import signInClient from "../utils/signInClient";
import signUpClient from "../utils/signUpClient";

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

  async function handleSignIn() {
    try {
      const response = await signInClient(email, password);
      if (response.status === "success") {
        const result = await signIn(response.idToken);
        if (result.status === "success") {
          setUserUid(result.uid);
          alert(result.message);
          setIsMember(true);
          setUserName(result.userName);
          navigate("/");
        } else {
          alert("您還不是會員，請先註冊");
          navigate("/signUp");
        }
      } else if (response.message === "密碼錯誤") {
        alert(response.message);
        setPassword("");
      } else if (response.message === "帳號不存在") {
        alert(response.message);
        setEmail("");
        setPassword("");
      } else if (response.message === "無效的憑證") {
        alert(response.message);
        setEmail("");
        setPassword("");
      } else {
        alert("其他錯誤");
        console.log("其他錯誤", response.message);
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSignInSignUp() {
    if (email.indexOf("@gmail.com") < 1) {
      alert("請輸入正確email");
      setEmail("");
      return;
    }
    if (isSignUp) {
      if (password !== confirmPassword) {
        alert("兩次密碼輸入不一致");
        setPassword("");
        setConfirmPassword("");
      } else if (password === confirmPassword) {
        try {
          const signUpClientResponse = await signUpClient(
            userName,
            email,
            password
          );
          if (signUpClientResponse.status === "success") {
            alert("登入成功");
            setUserUid(signUpClientResponse.uid);
            setIsMember(true);
            navigate("/");
          } else if (
            signUpClientResponse.message === "此電子郵件已經被註冊過"
          ) {
            alert(signUpClientResponse.message);
            setUserName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
          } else if (signUpClientResponse.message === "無效的電子郵件格式") {
            alert(signUpClientResponse.message);
            setEmail("");
          } else if (signUpClientResponse.message === "密碼強度不足") {
            alert(signUpClientResponse.message);
            setPassword("");
            setConfirmPassword("");
          } else {
            alert("其他錯誤");
            console.log("其他錯誤", signUpClientResponse);
          }
        } catch (error) {
          console.error("請求失敗:", error);
          alert("發生錯誤，請稍後再試");
        }
      }
    } else if (isSignIn) {
      handleSignIn();
    }

    //   if (isSignIn) {
    //     if (email.indexOf("@gmail.com") < 1) {
    //       alert("請輸入正確email");
    //       setEmail("");
    //     } else {
    //       try {
    //         const response = await signInClient(email, password);
    //         console.log("response", response);
    //         if (response.status === "success") {
    //           const result = await signIn(response.idToken);

    //           if (result.message === "Token 驗證成功") {
    //             alert(response.message);
    //             setIsMember(true);
    //             setUserName(result.userName);
    //             navigate("/");
    //           } else {
    //             alert("您還不是會員，請先註冊");
    //             navigate("/signUp");
    //           }
    //         } else if (response.message === "密碼錯誤") {
    //           alert(response.message);
    //           setPassword("");
    //         } else if (response.message === "帳號不存在") {
    //           alert(response.message);
    //           setEmail("");
    //           setPassword("");
    //         } else if (response.message === "無效的憑證") {
    //           alert(response.message);
    //           setEmail("");
    //           setPassword("");
    //         } else {
    //           alert("其他錯誤");
    //           console.log("其他錯誤", response.message);
    //           setEmail("");
    //           setPassword("");
    //         }
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     }
    //   } else if (isSignUp) {
    //     if (email.indexOf("@gmail.com") < 1) {
    //       alert("請輸入正確email");
    //       setEmail("");
    //     } else if (password !== confirmPassword) {
    //       alert("兩次密碼輸入不一致");
    //       setPassword("");
    //       setConfirmPassword("");
    //     } else if (password === confirmPassword) {
    //       try {
    //         const response = await signUpClient(userName, email, password);
    //         console.log("signUp response", response);
    //         // const response = await signUp(email, password, userName);
    //         // console.log("signUp:response", response);
    //         // if (response.data.status === "success") {
    //         //   alert(response.data.message);
    //         //   setIsMember(true);
    //         //   navigate("/");
    //         // } else if (response.data.message === "此電子郵件已經被註冊過") {
    //         //   alert(response.data.message);
    //         //   setUserName("");
    //         //   setEmail("");
    //         //   setPassword("");
    //         //   setConfirmPassword("");
    //         //   navigate("/signIn");
    //         // } else if (response.data.message === "無效的電子郵件格式") {
    //         //   alert(response.data.message);
    //         //   setEmail("");
    //         // } else if (response.data.message === "密碼強度不足") {
    //         //   alert(response.data.message);
    //         //   setPassword("");
    //         //   setConfirmPassword("");
    //         // } else {
    //         //   alert(response.data.message);
    //         // }
    //       } catch (error) {
    //         console.error("請求失敗:", error);
    //         alert("發生錯誤，請稍後再試");
    //       }
    //     }
    //   }
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
