import React from "react";
import { Link } from "react-router-dom";
// import { Input } from "antd";
// import Container from "../common/Container";
import Loge from "../../images/logo.svg";
import { FaBars } from "react-icons/fa6";
import CollapsedContext from "../Contexts/CollapsedContext";
import { IoSearch } from "react-icons/io5";
import { AtomLogin, AtomRegister } from "../../Recoil/Atom";
import { useRecoilState } from "recoil";
import { useLocation } from "react-router-dom";

function Header() {
  const { collapsed, setCollapsed } = React.useContext(CollapsedContext);
  const [login, setLogin] = useRecoilState(AtomLogin);
  const [register, setRegister] = useRecoilState(AtomRegister);
  const location = useLocation();

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
  }, [location]);

  return (
    <div>
      <div
        className={`fixed w-full bg-neutral-300 z-10 ${
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
              <FaBars size={30} className="cursor-pointer" />
            </div>
            <Link to="/" className=" inline-block">
              <img src={Loge} alt="Logo" className="block w-16 h-16 " />
            </Link>
          </div>
          <div className="flex items-center justify-center">
            <input className="w-60 h-8 md:w-96 rounded-l-3xl p-4 border-none outline-none" />
            <div className="w-16 h-8 bg-neutral-400 rounded-r-3xl flex items-center cursor-pointer ">
              <IoSearch className=" w-6 h-6 ml-4" />
            </div>
          </div>
          <div>
            <Link to="/register" className="p-4 hidden sm:inline-block">
              註冊
            </Link>
            <Link to="/login" className="p-4 hidden sm:inline-block">
              登入
            </Link>
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
          <img src={Loge} alt="Logo" className="block w-32 h-32 mx-12" />
        </Link>
        <div className="text-6xl text-neutral-300">
          {login ? "登入" : "註冊"}
        </div>
      </div>
    </div>
  );
}

export default Header;
