import React from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "antd";
import Logo from "../../images/logo.svg";
import { FaBars } from "react-icons/fa6";
import CollapsedContext from "../Contexts/CollapsedContext";
import { IoSearch } from "react-icons/io5";
import { AtomLogin, AtomRegister, AtomIsMember } from "../../Recoil/Atom";
import { useRecoilState } from "recoil";
import { useLocation } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";

function Header() {
  const { collapsed, setCollapsed } = React.useContext(CollapsedContext);
  const [login, setLogin] = useRecoilState(AtomLogin);
  const [register, setRegister] = useRecoilState(AtomRegister);
  const [isMember, setIsMember] = useRecoilState(AtomIsMember);
  const location = useLocation();

  const items = [
    {
      key: "1",
      label: (
        <Link
          to="/"
          onClick={() => {
            setIsMember(false);
          }}
        >
          登出
        </Link>
      ),
    },
    {
      key: "2",
      label: <Link to="/">item2</Link>,
    },
    {
      key: "3",
      label: <Link to="/">item3</Link>,
    },
  ];

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
          <div className={`${isMember ? "block" : "hidden"} flex items-center`}>
            {/* <div className="p-4 hidden sm:inline-block cursor-pointer"> */}
              <Dropdown
                menu={{
                  items,
                }}
                placement="bottomRight"
                arrow
              >
                <MdAccountCircle size={40} className="mr-6"/>
              </Dropdown>
            {/* </div> */}
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
