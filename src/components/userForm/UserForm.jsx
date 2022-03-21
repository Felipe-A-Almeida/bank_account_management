import React from 'react';

import {
  Form,
  Input,
  Button,
  Modal,
} from 'antd';

import { ExclamationCircleOutlined } from '@ant-design/icons';

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    if (props.id) this.getSelectedUser();
  }

  getSelectedUser = () => {
    fetch(`https://frontendapi.cm2tech.com.br/users/${this.props.id}`, {
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
        
      },
      method: "GET",
    })
      .then(response => response.json())
      .then((data) => {
        this.setState({ users: data })
        console.log(this.state.users?.name);
      });
  };

  onFinish = () => {
    
    console.log('Received values from form:', this.state);
    /*
    fetch('https://frontendapi.cm2tech.com.br/users', {
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify(this.state),
      method: "POST",
    })
      .then(response => response.json())
      .then(() => {
        window.location.href = '../';
      })
    */
    const idGenerated = '12345';
    this.confirm(idGenerated);
  };

  confirm(id) {
    Modal.confirm({
      title: 'Create Account',
      icon: <ExclamationCircleOutlined />,
      content: 'Do you wish to create an account to this user now? (you can do it later)',
      okText: 'Yes',
      cancelText: 'No',
      onOk() {
        window.location.href = '../user/' + id + '/bank_account';
      },
      onCancel() {
        window.location.href = '../';
      },
    });
  }

  onValuesChange = (value) => {
    this.setState({ [Object.keys(value)[0]]: Object.values(value)[0] });
  }

  render() {
    return (
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 12,
        }}
        layout="horizontal"
        initialValues={{
          size: 'default',
        }}
        onValuesChange={this.onValuesChange}
        size='default'
        onFinish={this.onFinish}
    >
      <Form.Item
        label="Name"
        name="name"
        value={this.state.users?.name}
        rules={[{ required: true, message: 'Input the name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="CPF"
        name="cpf"
        rules={[{ required: true, message: 'Input the CPF!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="E-mail"
        name="email"
        rules={[{ required: true, message: 'Input the E-mail!' }]}
      >
        <Input type="email"/>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    )
  }
}

export default UserForm;