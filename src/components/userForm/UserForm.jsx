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
    this.state = { form : {}};
    this.fields = {
      name: '',
      cpf: '',
      email: '',
      bankAccounts: [],
    }
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
        this.setState(
          { fields: (Object.entries(data).filter((property) => property[0] !== 'id').map((property) => {
            this.fields[property[0]] = property[1];
            return {
              name: property[0], value: property[1]
            }
          }))}
        )
      });
  };

  onFinish = () => {
    if(this.props.id) {
      if(Object.entries(this.state.form).length > 0) {        
        const object = {
          ...this.fields,
          ...this.state.form
        }
        fetch(`https://frontendapi.cm2tech.com.br/users/${this.props.id}`, {
          headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            
          },
          body: JSON.stringify(object),
          method: "PUT",
        })
        .then(response => response.json())
        .then(() => {
        window.location.href = '../';
        })
        
      }else {
        console.log('NÃO MODIFICAOD values from form:', this.state.form);
      }
    } else {
      fetch('https://frontendapi.cm2tech.com.br/users', {
        headers: {
          Accept: 'application/json',
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify(this.state.form),
        method: "POST",
      })
        .then(response => response.json())
        .then((data) => {
          const idGenerated = data.id;
          this.confirm(idGenerated);
        })
    }
    
  };

  confirm(id) {
    Modal.confirm({
      title: 'Create Account',
      icon: <ExclamationCircleOutlined />,
      content: 'Do you wish to create an account to this user now? (you can do it later)',
      okText: 'Yes',
      cancelText: 'No',
      onOk() {
        window.location.href = '../user/' + id + '/bank_accounts';
      },
      onCancel() {
        window.location.href = '../';
      },
    });
  }

  onValuesChange = (value) => {
    this.setState({ form:{ ...this.state.form, [Object.keys(value)]: Object.values(value)[0] }});
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
        onValuesChange={this.onValuesChange}
        size='default'
        onFinish={this.onFinish}
        fields={ (this.state.fields) || '' }
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