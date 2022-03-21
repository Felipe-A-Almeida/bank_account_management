import logo from '../../logo.svg';

import { Layout } from 'antd';

import { useParams } from "react-router-dom";

import Menu from '../../components/menu/Menu.jsx';

import BankAccountList from '../../components/bankAccountList/BankAccountList';

const { Content, Footer } = Layout;

function BankAccounts() {
  const { id } = useParams();
  return (
    <div>
      <Layout className="layout">
        <Menu />
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content container">
            <BankAccountList id = { id } />
          </div>
        </Content>
        <Footer className="text-align-center">FelBank ©2022 Created by Felipe A. de Almeida</Footer>
      </Layout>
    </div>
  );
}

export default BankAccounts;
