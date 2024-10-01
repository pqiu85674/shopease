import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../images/logo.svg";
import { FaBars } from "react-icons/fa6";
import CollapsedContext from "../Contexts/CollapsedContext";
import { IoSearch, IoClose } from "react-icons/io5";
import {
  AtomIsSignIn,
  AtomIsSignUp,
  AtomUserName,
  AtomUserUid,
  AtomIsMember,
  AtomUseIcon,
} from "../../Recoil/Atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useLocation, useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { BiSolidMessageRoundedError } from "react-icons/bi";
import getProducts from "../../axios/getProducts";
import axios from "axios";
import { AtomGetCustomerShopCarFromFirebase } from "../../Recoil/Atom";
import customerShopCar from "../../axios/customerShopCar";

function Header() {
  const { collapsed, setCollapsed } = React.useContext(CollapsedContext);
  const [isSignIn, setIsSignIn] = useRecoilState(AtomIsSignIn);
  const [isSignUp, setIsSignUp] = useRecoilState(AtomIsSignUp);
  const [userName, setUserName] = useRecoilState(AtomUserName);
  const [isMember, setIsMember] = useRecoilState(AtomIsMember);
  const [shopCar, setShopCar] = useRecoilState(
    AtomGetCustomerShopCarFromFirebase
  );
  const [useIcon, setUseIcon] = useRecoilState(AtomUseIcon);
  const userUid = useRecoilValue(AtomUserUid);
  const [search, setSearch] = React.useState("");

  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (location.pathname === "/") {
      setIsSignIn(false);
      setIsSignUp(false);
    } else if (location.pathname === "/signIn") {
      setIsSignIn(true);
      setIsSignUp(false);
    } else if (location.pathname === "/signUp") {
      setIsSignIn(false);
      setIsSignUp(true);
    }
  }, [location, setIsSignIn, setIsSignUp]);

  React.useEffect(() => {
    (async () => {
      setShopCar(await customerShopCar(userUid));
    })();
  }, [userUid, setShopCar]);

  return (
    <div>
      <div
        className={`fixed w-full bg-neutral-600 z-10 ${
          isSignIn || isSignUp ? "hidden" : "block"
        }`}
        onClick={() => {
          setUseIcon(false);
        }}
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
            <Link
              to="/"
              className=" inline-block"
              onClick={() => {
                setSearch("");
              }}
            >
              <img src={Logo} alt="Logo" className="block w-16 h-16 " />
            </Link>

            <div
              className={`text-neutral-300 text-xl font-bold ${
                location.pathname === "/shopCar" ? "block" : "hidden"
              }`}
            >
              購物車
            </div>

            <div
              className={`text-neutral-300 text-xl font-bold ${
                location.pathname === "/pay" ? "block" : "hidden"
              }`}
            >
              結帳
            </div>

            <button
              onClick={() => {
                getProducts();
                axios
                  .get("http://localhost:3000/addProducts")
                  .then((response) => {
                    console.log(response);
                  })
                  .catch((err) => console.log(err));
              }}
            >
              test
            </button>
          </div>
          <div className="flex items-center justify-center">
            <input
              className="w-40 h-8 md:w-60 lg:w-96 rounded-l-3xl p-4 border-none outline-none"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  navigate("/", { state: { search } });
                }
              }}
              value={search}
            />
            <div className="w-12 h-8 md:w-16 bg-neutral-400 rounded-r-3xl flex items-center cursor-pointer ">
              <IoSearch
                className=" w-6 h-6 ml-2 md:ml-4"
                onClick={() => {
                  navigate("/", { state: { search } });
                }}
              />
            </div>
          </div>
          <div className={`${isMember ? "hidden" : "block"}`}>
            <Link to="/signUp" className="p-4 hidden sm:inline-block">
              註冊
            </Link>
            <Link to="/signIn" className="p-4 hidden sm:inline-block">
              登入
            </Link>
          </div>
          <div
            className={`${
              isMember ? "block" : "hidden"
            } flex items-center gap-4`}
          >
            <div className="relative cursor-pointer">
              <Link to="/shopCar">
                <BiSolidMessageRoundedError
                  className={`text-rose-500 absolute top-0 right-0 ${
                    shopCar.length > 0 ? "block" : "hidden"
                  }`}
                  size={20}
                />
                <FaShoppingCart size={30} className="m-2 mr-3" />
              </Link>
            </div>
            <MdAccountCircle
              size={40}
              className="mr-6 cursor-pointer"
              onClick={(e) => {
                setUseIcon(!useIcon);
                e.stopPropagation();
              }}
            />
            <div
              className={`transition-all absolute top-20 right-4 bg-neutral-700 w-48 h-96 rounded-lg py-6 text-xl ${
                useIcon ? "block" : "hidden"
              }`}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <IoClose
                size={40}
                className="absolute top-2 right-2 cursor-pointer"
                onClick={() => {
                  setUseIcon(false);
                }}
              />
              <div className="flex items-center mb-2 gap-2">
                <MdAccountCircle size={46} className="ml-4 inline-block" />
                <div className="inline-block">{`${userName}`}</div>
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
                  setUserName("");
                }}
              >
                登出
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`w-full h-16 ${isSignIn || isSignUp ? "hidden" : "block"}`}
      ></div>
      <div
        className={`flex items-center w-full h-32 bg-neutral-600 ${
          isSignIn || isSignUp ? "block" : "hidden"
        }`}
      >
        <Link to="/" className=" inline-block">
          <img src={Logo} alt="Logo" className="block w-32 h-32 ml-20 mr-8" />
        </Link>
        <div className="text-6xl text-neutral-300 font-black">
          {isSignIn && "登入"}
          {isSignUp && "註冊"}
        </div>
      </div>
    </div>
  );
}

export default Header;
