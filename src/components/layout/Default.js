import React from "react";
import {
  // AppstoreOutlined,
  // BarChartOutlined,
  // CloudOutlined,
  // ShopOutlined,
  // TeamOutlined,
  // UploadOutlined,
  UserOutlined,
  // VideoCameraOutlined,
} from "@ant-design/icons";

import { IoMdHome } from "react-icons/io";

import { Layout, Menu, theme } from "antd";
import Header from "./Header";
import CollapsedContext from "../Contexts/CollapsedContext";
import { AtomUseIcon } from "../../Recoil/Atom";
import { useSetRecoilState } from "recoil";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const { Content, Sider } = Layout;
const siderStyle = {
  overflow: "auto",
  height: "calc(100vh - 64px)",
  position: "fixed",
  insetInlineStart: 0,
  top: "64px",
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarColor: "unset",
};
const items = [
  IoMdHome,
  UserOutlined,
  // VideoCameraOutlined,
  // UploadOutlined,
  // BarChartOutlined,
  // CloudOutlined,
  // AppstoreOutlined,
  // TeamOutlined,
  // ShopOutlined,
].map((icon, index) => {
  let label = "";
  switch (index) {
    case 0:
      label = "回首頁";
      break;
    case 1:
      label = "我的檔案";
      break;
    default:
      break;
  }
  return {
    key: String(index + 1),
    icon: React.createElement(icon),
    label: label,
  };
});

const Default = ({ children }) => {
  const { collapsed } = React.useContext(CollapsedContext);
  const setUseIcon = useSetRecoilState(AtomUseIcon);
  const navigate = useNavigate();

  const layoutStyle = React.useMemo(
    () => ({
      marginInlineStart: collapsed ? "80px" : "200px",
    }),
    [collapsed]
  );

  const {
    token: { borderRadiusLG },
  } = theme.useToken();
  return (
    <div>
      <Header />
      <Layout
        className="bg-neutral-600"
        onClick={() => {
          setUseIcon(false);
        }}
      >
        <Sider style={siderStyle} collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            items={items}
            className="bg-neutral-600"
            onClick={(e) => {
              switch (e.key) {
                case "1":
                  navigate("/");
                  break;
                case "2":
                  navigate("/account");
                  break;
                default:
                  break;
              }
            }}
          />
        </Sider>
        <Layout
          style={layoutStyle}
          className={`bg-neutral-500 transition-all duration-200 `}
        >
          <Content className="m-4 relative">
            <div
              style={{
                padding: 24,
                textAlign: "center",
                // background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
              className="bg-neutral-300"
            >
              {children}
            </div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </div>
  );
};
export default Default;
