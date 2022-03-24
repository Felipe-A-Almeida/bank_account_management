import React from 'react';

import { 
  Table,
  Button,
  Modal
} from 'antd';
import { 
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined 
} from '@ant-design/icons';

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
              <Button 
                shape="round"
                size={ 'small' }
                className="list-button list-button-m margin-sides-sm"
                icon={<EditOutlined />}
              >
                Edit
              </Button>
            </Link>
            <Button
              danger
              shape="round"
              size={ 'small' }
              className="list-button list-button-m margin-sides-sm"
              icon={<DeleteOutlined />}
              onClick={ () => this.showDeleteModal() }
            >
              Delete 
            </Button>
            <Modal 
              title="Delete User"
              visible={this.state.isModalVisible}
              onCancel={() => this.handleCancel()}
              onOk={() => this.delete(this.state.accounts[i].id)}
            >
              <p>Do you wish to delete this user now?</p>
            </Modal>
          </div>
        )
      });
    }

    return <Table 
            dataSource={data}
            columns={columns}
            pagination={{ pageSize: 5 }} 
          />
  }

  showDeleteModal = () => {
    this.setState({ isModalVisible: true });
  }

  delete = (id) => {
    this.setState({ isModalVisible: false });
    
    fetch(`https://frontendapi.cm2tech.com.br/bank_accounts/${id}`, {
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
      },
      method: "DELETE",
    })
    
    this.setState({
      accounts: this.state.accounts.filter(user => user.id !== id)
    })
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
        <div 
          className="display-flex space-between container-header"
        >
          <h1>Bank Accounts</h1>
          <Link to="new">
            <Button 
              shape="round"
              type="primary"
              size={ 'large' }
              className="list-button"
              icon={<PlusCircleOutlined />}
            >
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
