import React from 'react';

import { Table, Button, Modal } from 'antd';
import { PlusCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

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
      },
      {
        title: 'Actions',
        dataIndex: 'actions',
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
        actions: (
          <div>
            <Link to={'./' + this.state.accounts[i].id }>
              <Button shape="round" icon={<EditOutlined />} size={ 'small' }> Edit </Button>
            </Link>
            <Button shape="round" icon={<DeleteOutlined />} size={ 'small' } danger onClick={ () => this.showDeleteModal() }> Delete </Button>
            <Modal title="Delete User" visible={this.state.isModalVisible} onOk={() => this.delete(this.state.accounts[i].id)} onCancel={() => this.handleCancel()}>
              <p>Do you wish to delete this user now?</p>
            </Modal>
          </div>
        )
      });
    }

    return <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
  }

  showDeleteModal = () => {
    this.setState({ isModalVisible: true });
  }

  delete = (id) => {
    console.log(id);
    this.setState({ isModalVisible: false });
    
    fetch(`https://frontendapi.cm2tech.com.br/bank_accounts/${id}`, {
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
      },
      method: "DELETE",
    })
    
    this.setState({ accounts: this.state.accounts.filter(user => user.id !== id)})
    this.renderTable(this.state.accounts);
  }

  handleCancel = () => {
    this.setState({ isModalVisible: false });
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
