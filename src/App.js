import "./input.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import { ConfigProvider } from "antd";
import { CollapsedProvider } from "./components/Contexts/CollapsedContext";

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
          </Routes>
        </CollapsedProvider>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
