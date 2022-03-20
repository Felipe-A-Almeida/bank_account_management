import React from 'react';
import './accountsList.css';
import { Table, Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import {
  Link
} from "react-router-dom";

class AccountsList extends React.Component {

  constructor() {
    super();
    this.state = { users: [], dataTable: {} };
    this.getUsers();
  }

  renderTable() {
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
    ];
    
    const data = [];
    for (let i = 0; i < this.state.users.length; i++) {
      data.push({
        key: i,
        name: this.state.users[i].name,
        cpf: this.state.users[i].cpf,
        email: this.state.users[i].email,
      });
    }

    return <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
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
          { this.renderTable() }
        </div>
      </div>
    )
  }
}

export default AccountsList