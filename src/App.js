import "./input.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import { ConfigProvider } from "antd";
import { CollapsedProvider } from "./components/Contexts/CollapsedContext";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Product from "./Pages/Product";
import ShopCar from "./Pages/ShopCar";
import React from "react";
import getProducts from "./axios/getProducts";
import { AtomGetAllProductsFromFirebase } from "./Recoil/Atom";
import { useSetRecoilState } from "recoil";
import Pay from "./Pages/Pay";
import Account from "./Pages/Account";

function App() {
  const setProducts = useSetRecoilState(AtomGetAllProductsFromFirebase);
  React.useEffect(() => {
    async function fetchProducts() {
      try {
        const result = await getProducts();
        setProducts(result.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProducts();
  }, [setProducts]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "gray",
        },
        components: {
          Layout: {
            siderBg: "bg-neutral-300", // Sider 背景颜色
          },
        },
      }}
    >
      <BrowserRouter>
        <CollapsedProvider>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/signIn" element={<SignIn />}></Route>
            <Route path="/signUp" element={<SignUp />}></Route>
            <Route path="/product/:path" element={<Product />}></Route>
            <Route path="/shopCar" element={<ShopCar />}></Route>
            <Route path="/pay" element={<Pay />}></Route>
            <Route path="/account" element={<Account />}></Route>
          </Routes>
        </CollapsedProvider>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
