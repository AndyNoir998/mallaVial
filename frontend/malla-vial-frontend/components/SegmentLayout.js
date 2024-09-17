import { Layout, Menu } from 'antd';
import React from 'react';
const { Header, Content, Footer } = Layout;

const SegmentLayout = ({ children }) => (
  <Layout>
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="1">Inicio</Menu.Item>
        <Menu.Item key="2">Segmentos</Menu.Item>
        <Menu.Item key="3">Calzadas</Menu.Item>
        <Menu.Item key="4">Bordillos</Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <div style={{ padding: 24, minHeight: 280 }}>{children}</div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Malla Vial ©2024</Footer>
  </Layout>
);

export default SegmentLayout;
