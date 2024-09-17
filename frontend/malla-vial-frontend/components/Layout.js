
import { Layout, Menu } from 'antd';
import React from 'react';
import { useRouter } from 'next/router';

const { Header, Content, Footer } = Layout;

const MyLayout = ({ children }) => {
  const router = useRouter();

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[router.pathname]}
          onClick={({ key }) => router.push(key)}
        >
          <Menu.Item key="/">Inicio</Menu.Item>
          <Menu.Item key="/segmentos">Segmentos</Menu.Item>
          <Menu.Item key="/calzadas">Calzadas</Menu.Item>
          <Menu.Item key="/bordillos">Bordillos</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div style={{ padding: 24, minHeight: 280 }}>{children}</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Malla Vial ©2024</Footer>
    </Layout>
  );
};

export default MyLayout;
