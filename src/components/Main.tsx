// Main.tsx
import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, Dropdown } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const Main: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<LogoutOutlined />} onClick={handleLogout}>
        Çıkış Yap
      </Menu.Item>
    </Menu>
  );

  const colorBgContainer = '#FFFFFF';

  return (
    <div className="app-container">
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
          >
            <Menu.Item key="1" icon={<UploadOutlined/>}>
              <Link to="/uploadexcel">Excel dosyası</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined/>}>
              <Link to="/exceldetail">Detay</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined/>}>
              <Link to="/excellist">Excel Liste</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <Dropdown overlay={menu} placement="bottomLeft">
              <Button
                type="text"
                style={{
                  fontSize: '16px',
                  width: 150,
                  height: 64,
                  textDecoration: 'none',
                  position: 'fixed',
                  top: 0,
                  right: 0,
                  zIndex: 999,
                }}
              >
                <UserOutlined /> Kullanıcı
              </Button>
            </Dropdown>
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 'calc(100vh - 64px)',
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Main;
