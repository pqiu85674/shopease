import React from "react";
import Header from "../components/layout/Header";
import { AtomLogin, AtomRegister, AtomIsMember } from "../Recoil/Atom";
import { useRecoilValue, useRecoilState } from "recoil";
import Logo from "../images/logo.svg";
import { Input, Space, Button, Divider } from "antd";
import { Link, useNavigate } from "react-router-dom";

function LoginRegister() {
  const login = useRecoilValue(AtomLogin);
  const register = useRecoilValue(AtomRegister);
  const [isMember, setIsMember] = useRecoilState(AtomIsMember);
  const [account, setAccount] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const navigate = useNavigate();

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
          <lable className="m-4 w-36 block">
            {login && "登入"}
            {register && "註冊"}
          </lable>

          <Space direction="vertical" size="large" className="w-full">
            <Input
              placeholder="account"
              onChange={(e) => {
                setAccount(e.target.value);
              }}
              value={account}
            />
            <Input.Password
              placeholder="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
            <Input.Password
              placeholder="confirm password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              className={`${register ? "inline-flex" : "hidden"}`}
              value={confirmPassword}
            />
            <Button
              type="primary"
              block
              className="mt-4"
              onClick={() => {
                if (password === confirmPassword) {
                  setIsMember(true);
                  navigate("/");
                } else if (account === "test" && password === "test") {
                  setIsMember(true);
                  navigate("/");
                } else {
                  setAccount("");
                  setPassword("");
                  setConfirmPassword("");
                  alert("輸入錯誤");
                }
              }}
            >
              {login && "登入"}
              {register && "註冊"}
            </Button>
            <Divider className="my-1" />
            <div className="text-center mr-4">
              {login && "新朋友？"}
              {login && <Link to="/register">註冊</Link>}

              {register && "已經有帳號了嗎？"}
              {register && <Link to="/login">登入</Link>}
            </div>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;
