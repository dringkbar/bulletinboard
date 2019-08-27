import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Timeline from './routes/Timeline';
import MyPage from './routes/MyPage';
import Login from './routes/Login';

const { Header, Content, Footer, Sider } = Layout;

class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Sider
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
            }}
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Icon type="home" />
                <span className="nav-text">Home</span>
                <Link to="/" />
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="user" />
                <span className="nav-text">MyPage</span>
                <Link to="/mypage" />
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="export" />
                <span className="nav-text">Login</span>
                <Link to="/login" />
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ marginLeft: 200 }}>
            <Header style={{ background: '#fff', padding: 0 }} />
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
              <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
                <Switch>
                  <Route exact path="/" component={Timeline} />
                  <Route path="/mypage" component={MyPage} />
                  <Route path="/login" component={Login} />
                </Switch>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;