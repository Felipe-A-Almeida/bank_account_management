import logo from '../../logo.svg';

import { Layout } from 'antd';


import Menu from '../../components/menu/Menu.jsx';
import AccountsList from '../../components/accountsList/AccountsList.jsx';
import UserForm from '../../components/userForm/UserForm';

const { Content, Footer } = Layout;

function NewUser() {
  return (
    <div>
      <Layout className="layout">
        <Menu />
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content container">
            <UserForm />
          </div>
        </Content>
        <Footer className="text-align-center">FelBank ©2022 Created by Felipe A. de Almeida</Footer>
      </Layout>
    </div>
  );
}

export default NewUser;
