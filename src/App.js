import logo from './logo.svg';
import './App.css';

import { Layout } from 'antd';


import Menu from './components/menu/Menu.jsx';
import AccountsList from './components/accountsList/AccountsList.jsx';

const { Content, Footer } = Layout;

function App() {
  return (
    <div className="App">
      <Layout className="layout">
        <Menu />
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content container">
            <AccountsList />
          </div>
        </Content>
        <Footer className="text-align-center">FelBank ©2022 Created by Felipe A. de Almeida</Footer>
      </Layout>
    </div>
  );
}

export default App;
