import React from "react";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Card } from "antd";
import Header from "./Header";
import CollapsedContext from "../Contexts/CollapsedContext";

const { Content, Footer, Sider } = Layout;
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
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));
const App = () => {
  // const [collapsed, setCollapsed] = React.useState(false);
  const { collapsed } = React.useContext(CollapsedContext);

  const layoutStyle = React.useMemo(
    () => ({
      marginInlineStart: collapsed ? "80px" : "200px",
    }),
    [collapsed]
  );

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <div>
      <Header />
      <div className="w-full h-16"></div>
      <Layout hasSider>
        <Sider
          style={siderStyle}
          className="bg-neutral-300"
          collapsed={collapsed}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["4"]}
            items={items}
            className="bg-neutral-600 "
          />
        </Sider>
        <Layout style={{...layoutStyle , transition:"all 0.2s"}}>
          <Content
            style={{
              margin: "24px 16px 0",
              overflow: "initial",
            }}
          >
            <div
              style={{
                padding: 24,
                textAlign: "center",
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <p>long content</p>
              {
                Array.from(
                  {
                    length: 100,
                  },
                  (_, index) => (
                    <React.Fragment key={index}>
                      {index % 20 === 0 && index ? "more" : "..."}
                      <br />
                    </React.Fragment>
                  )
                )
              }
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};
export default App;
