import { Component } from 'react';

import { 
  Table,
  Button,
  Modal
} from 'antd'
;
import { 
  EyeOutlined,
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';

import { Link } from "react-router-dom";

class UserList extends Component {

  constructor() {
    super();
    this.state = { 
      users: [],
      dataTable: {},
      isModalVisible: false 
    };
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
          <Link to={
            'user/' + users[i].id + '/bank_accounts'
          }>
            <Button 
              shape="round"
              type="primary"
              size={ 'small' }
              icon={<EyeOutlined />}
              className="list-button list-button-g"
            > 
              View Accounts
            </Button>
          </Link>
        ),
        actions: (
          <div>
            <Link to={
              'user/' + users[i].id 
            }>
              <Button 
                shape="round"
                size={ 'small' }
                icon={<EditOutlined />}
                className="list-button list-button-m margin-sides-sm"
              >
                Edit
              </Button>
            </Link>
            <Button
              danger
              shape="round"
              size={ 'small' } 
              icon={<DeleteOutlined />}              
              onClick={ () => this.showDeleteModal() }
              className="list-button list-button-m margin-sides-sm"
            >
              Delete
            </Button>
            <Modal 
              title="Delete User"
              visible={this.state.isModalVisible}
              onCancel={() => this.handleCancel()}
              onOk={() => this.delete(users[i].id)}
            >
              <p>Are you sure you want to delete this user?</p>
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
    
    fetch(`https://frontendapi.cm2tech.com.br/users/${id}`, {
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
    
    this.setState({ 
      users: this.state.users.filter(user => user.id !== id)
    });
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
        <div 
          className="
            display-flex
            space-between
            container-header
          "
        >
          <h1>Usuários</h1>
          <Link to="/user/new">
            <Button 
              shape="round" 
              type="primary"
              size={ 'large' }
              className="list-button"
              icon={<PlusCircleOutlined />}
            >
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

export default UserList