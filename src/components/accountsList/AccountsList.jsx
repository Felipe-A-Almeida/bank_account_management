import { Component } from 'react';
import './accountsList.css';
import { Table, Button, Modal } from 'antd';
import { EyeOutlined, PlusCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import {
  Link
} from "react-router-dom";

class AccountsList extends Component {

  constructor() {
    super();
    this.state = { users: [], dataTable: {}, isModalVisible: false };
    this.getUsers();
  }

  renderTable(users) {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        width: 150,
      },
      {
        title: 'CPF',
        dataIndex: 'cpf',
        width: 150,
      },
      {
        title: 'E-mail',
        dataIndex: 'email',
      },
      {
        title: 'Accounts',
        dataIndex: 'accounts',
      },
      {
        title: 'Actions',
        dataIndex: 'actions',
      }
    ];
    
    const data = [];
    for (let i = 0; i < users.length; i++) {
      data.push({
        key: i,
        name: users[i].name,
        cpf: users[i].cpf,
        email: users[i].email,
        accounts: (
          <Link to={'user/' + users[i].id + '/bank_account'}>
            <Button type="primary" shape="round" icon={<EyeOutlined />} size={ 'small' }> View Accounts </Button>
          </Link>
        ),
        actions: (
          <div>
            <Link to={'user/' + users[i].id }>
              <Button shape="round" icon={<EditOutlined />} size={ 'small' }> Edit </Button>
            </Link>
            <Button shape="round" icon={<DeleteOutlined />} size={ 'small' } danger onClick={ () => this.showDeleteModal() }> Delete </Button>
            <Modal title="Delete User" visible={this.state.isModalVisible} onOk={() => this.delete(users[i].id)} onCancel={() => this.handleCancel()}>
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
    
    fetch(`https://frontendapi.cm2tech.com.br/users/${id}`, {
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
      },
      method: "DELETE",
    })
    
    this.setState({ users: this.state.users.filter(user => user.id !== id)})
    this.renderTable(this.state.users);
  }

  handleCancel = () => {
    this.setState({ isModalVisible: false });
  }

  getUsers() {
    
    fetch('https://frontendapi.cm2tech.com.br/users', {
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
        
      },
      method: "GET",
    })
      .then(response => response.json())
      .then((data) => {
        this.setState({ users: data })
      });
  }

  render() {
    return (
      <div>
        <div className="display-flex space-between container-header">
          <h1>Usuários</h1>
          <Link to="/user/new">
            <Button type="primary" shape="round" icon={<PlusCircleOutlined />} size={ 'large' }>
              Create user
            </Button>
          </Link>
        </div>
        <div className='default-table'>
          { this.renderTable(this.state.users) }
        </div>
      </div>
    )
  }
}

export default AccountsList