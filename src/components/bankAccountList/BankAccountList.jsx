import React from 'react';

import { Table, Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import {
  Link
} from "react-router-dom";

class BankAccountList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { accounts: [], dataTable: {} };
    this.getAccounts();
  }

  renderTable() {
    const columns = [
      {
        title: 'Account Name',
        dataIndex: 'accountName',
        width: 150,
      },
      {
        title: 'Agency',
        dataIndex: 'agency',
        width: 150,
      },
      {
        title: 'Agency Digit',
        dataIndex: 'agencyDigit',
      },
      {
        title: 'Account Number',
        dataIndex: 'accountNumber',
      },
      {
        title: 'Account Digit',
        dataIndex: 'accountDigit',
      },
      {
        title: 'Account Type',
        dataIndex: 'accountType',
      }
    ];
    
    const data = [];
    for (let i = 0; i < this.state.accounts.length; i++) {
      data.push({
        key: i,
        accountName: this.state.accounts[i].accountName,
        agency: this.state.accounts[i].agency,
        agencyDigit: this.state.accounts[i].agencyDigit,
        accountNumber: this.state.accounts[i].accountNumber,
        accountDigit: this.state.accounts[i].accountDigit,
        accountType: this.state.accounts[i].accountType,
      });
    }

    return <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
  }

  getAccounts = () => {
    fetch(`https://frontendapi.cm2tech.com.br/users/${this.props.id}/bank_accounts`, {
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
        
      },
      method: "GET",
    })
      .then(response => response.json())
      .then((data) => {
        this.setState({ accounts: data })
      });
    
  }

  render() {
    return (
      <div>
        <div className="display-flex space-between container-header">
          <h1>Bank Accounts</h1>
          <Link to="new">
            <Button type="primary" shape="round" icon={<PlusCircleOutlined />} size={ 'large' }>
              Create account
            </Button>
          </Link>
        </div>
        <div className='default-table'>
          { this.renderTable() }
        </div>
      </div>
    )
  }
}

export default BankAccountList;
