import './App.css';

import { Layout } from 'antd';


import Menu from './components/menu/Menu.jsx';
import UserList from './components/userList/UserList.jsx';

const { Content, Footer } = Layout;

function App() {
  return (
    <div className="App">
      <Layout className="layout">
        <Menu />
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content container">
            <UserList />
          </div>
        </Content>
        <Footer className="text-align-center">FEHBANK ©2022 Created by Felipe A. de Almeida</Footer>
      </Layout>
    </div>
  );
}

export default App;
