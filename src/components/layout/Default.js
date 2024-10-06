import React from "react";
import { HomeOutlined, HistoryOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import Header from "./Header";
import CollapsedContext from "../Contexts/CollapsedContext";
import { AtomUseIcon } from "../../Recoil/Atom";
import { useSetRecoilState } from "recoil";
import Footer from "./Footer";
import { useNavigate, useLocation } from "react-router-dom";

const { Content, Sider } = Layout;
const siderStyle = {
  overflow: "auto",
  height: "calc(100vh - 64px)",
  position: "fixed",
  insetInlineStart: 0,
  top: "96px",
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarColor: "unset",
};
const items = [HomeOutlined, HistoryOutlined].map(
  (icon, index) => {
    let label = "";
    switch (index) {
      case 0:
        label = "回首頁";
        break;
      case 1:
        label = "交易紀錄";
        break;
      default:
        break;
    }
    return {
      key: String(index + 1),
      icon: React.createElement(icon),
      label: label,
    };
  }
);

const Default = ({ children }) => {
  const { collapsed } = React.useContext(CollapsedContext);
  const setUseIcon = useSetRecoilState(AtomUseIcon);
  const [selectedKeys, setSelectedKeys] = React.useState();
  const location = useLocation();
  const navigate = useNavigate();

  const layoutStyle = React.useMemo(
    () => ({
      marginInlineStart: collapsed ? "80px" : "300px",
    }),
    [collapsed]
  );

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  React.useEffect(() => {
    switch (location.pathname) {
      case "/":
        setSelectedKeys(["1"]);
        break;
      case "/order":
        setSelectedKeys(["2"]);
        break;
      default:
        break;
    }
  }, [location.pathname]);

  return (
    <div>
      <Header />
      <Layout
        className="bg-neutral-600"
        onClick={() => {
          setUseIcon(false);
        }}
      >
        <Sider style={siderStyle} collapsed={collapsed} width={300}>
          <div className="demo-logo-vertical" />
          <Menu
            selectedKeys={selectedKeys}
            theme="dark"
            mode="inline"
            items={items}
            style={{ fontSize: "40px" }}
            className="bg-neutral-600"
            onClick={(e) => {
              switch (e.key) {
                case "1":
                  navigate("/");
                  break;
                case "2":
                  navigate("/order");
                  break;
                case "3":
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
          <Content className="m-4 relative ">
            <div
              style={{
                padding: 24,
                textAlign: "center",
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
