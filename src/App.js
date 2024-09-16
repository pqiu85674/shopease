import "./input.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import { ConfigProvider } from "antd";
import { CollapsedProvider } from "./components/Contexts/CollapsedContext";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Product from "./Pages/Product";

function App() {
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
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/product/:path" element={<Product />}></Route>
          </Routes>
        </CollapsedProvider>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
