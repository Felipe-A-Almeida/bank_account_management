import logo from '../../logo.svg';

import { Layout } from 'antd';

import { useParams } from "react-router-dom";

import Menu from '../../components/menu/Menu.jsx';
import BankAccountForm from '../../components/bankAccountForm/BankAccountForm';

const { Content, Footer } = Layout;

function NewUser() {
  const { id, accountId } = useParams();
  return (
    <div>
      <Layout className="layout">
        <Menu />
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content container">
            <BankAccountForm id={id} accountId={accountId} />
          </div>
        </Content>
        <Footer className="text-align-center">FelBank ©2022 Created by Felipe A. de Almeida</Footer>
      </Layout>
    </div>
  );
}

export default NewUser;
