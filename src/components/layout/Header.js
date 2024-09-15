import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../images/logo.svg";
import { FaBars } from "react-icons/fa6";
import CollapsedContext from "../Contexts/CollapsedContext";
import { IoSearch, IoClose } from "react-icons/io5";
import {
  AtomLogin,
  AtomRegister,
  AtomUseName,
  AtomIsMember,
} from "../../Recoil/Atom";
import { useRecoilState } from "recoil";
import { useLocation } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";

function Header() {
  const { collapsed, setCollapsed } = React.useContext(CollapsedContext);
  const [login, setLogin] = useRecoilState(AtomLogin);
  const [register, setRegister] = useRecoilState(AtomRegister);
  const [useName, setUseName] = useRecoilState(AtomUseName);
  const [isMember, setIsMember] = useRecoilState(AtomIsMember);
  const location = useLocation();
  const [useIcon, setUseIcon] = React.useState(false);

  React.useEffect(() => {
    if (location.pathname === "/") {
      setLogin(false);
      setRegister(false);
    } else if (location.pathname === "/login") {
      setLogin(true);
      setRegister(false);
    } else if (location.pathname === "/register") {
      setLogin(false);
      setRegister(true);
    }
  }, [location, setLogin, setRegister]);

  return (
    <div>
      <div
        className={`fixed w-full bg-neutral-600 z-10 ${
          login || register ? "hidden" : "block"
        }`}
      >
        <div className="flex justify-between items-center">
          <div className="flex justify-between items-center ml-8 gap-2">
            <div
              onClick={() => {
                setCollapsed(!collapsed);
              }}
            >
              <FaBars size={36} className="cursor-pointer" />
            </div>
            <Link to="/" className=" inline-block">
              <img src={Logo} alt="Logo" className="block w-16 h-16 " />
            </Link>
          </div>
          <div className="flex items-center justify-center">
            <input className="w-40 h-8 md:w-60 lg:w-96 rounded-l-3xl p-4 border-none outline-none" />
            <div className="w-12 h-8 md:w-16 bg-neutral-400 rounded-r-3xl flex items-center cursor-pointer ">
              <IoSearch className=" w-6 h-6 ml-2 md:ml-4" />
            </div>
          </div>
          <div className={`${isMember ? "hidden" : "block"}`}>
            <Link to="/register" className="p-4 hidden sm:inline-block">
              註冊
            </Link>
            <Link to="/login" className="p-4 hidden sm:inline-block">
              登入
            </Link>
          </div>
          <div
            className={`${
              isMember ? "block" : "hidden"
            } flex items-center gap-4`}
          >
            <MdAccountCircle
              size={40}
              className="mr-6 cursor-pointer"
              onClick={() => {
                setUseIcon(!useIcon);
              }}
            />
            <div
              className={`transition-all absolute top-20 right-4 bg-neutral-600 w-48 h-96 rounded-lg py-6 text-xl ${
                useIcon ? "block" : "hidden"
              }`}
            >
              <IoClose
                size={40}
                className="absolute top-2 right-2 cursor-pointer"
                onClick={() => {
                  setUseIcon(!useIcon);
                }}
              />
              <div className="flex items-center mb-2 gap-2">
                <MdAccountCircle size={46} className="ml-4 inline-block" />
                <div className="inline-block">{`${useName}`}</div>
              </div>
              <Link
                to="/"
                className="py-1 px-6 hover:bg-neutral-500 text-neutral-300 cursor-pointer block"
              >
                我的檔案
              </Link>
              {/* <div className="w-full h-0.5 bg-neutral-300"></div> */}
              <Link
                to="/"
                className="py-1 px-6 hover:bg-neutral-500 text-neutral-300 cursor-pointer block"
                onClick={() => {
                  setIsMember(false);
                  setUseName("");
                }}
              >
                登出
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`w-full h-16 ${login || register ? "hidden" : "block"}`}
      ></div>
      <div
        className={`flex items-center w-full h-32 bg-neutral-600 ${
          login || register ? "block" : "hidden"
        }`}
      >
        <Link to="/" className=" inline-block">
          <img src={Logo} alt="Logo" className="block w-32 h-32 ml-20 mr-8" />
        </Link>
        <div className="text-6xl text-neutral-300 font-black">
          {login && "登入"}
          {register && "註冊"}
        </div>
      </div>
    </div>
  );
}

export default Header;
