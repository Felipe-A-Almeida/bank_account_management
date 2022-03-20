import React from 'react';

import {
  Form,
  Input,
  Button,
  Select,
} from 'antd';

const { Option } = Select;

class UserForm extends React.Component {
  constructor() {
    super();
    this.state = { 
      name: null,
    };
  }

  onFinish = () => {
    console.log('Received values from form:', this.state);
  };

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
        <Input />
      </Form.Item>
      <Form.Item
        label="Account Name"
        name="account_name"
        rules={[{ required: true, message: 'Input the E-mail!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Agency"
        name="agency"
        rules={[{ required: true, message: 'Input the agency number!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Agency Digit"
        name="agency_digit"
        rules={[{ required: true, message: 'Input the agency digit!' }]}
      >
        <Input />
      </Form.Item> 
      <Form.Item
        label="Account Number"
        name="account_number"
        rules={[{ required: true, message: 'Input the account number!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Account Digit"
        name="account_digit"
        rules={[{ required: true, message: 'Input the account digit!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item 
        label="Account Type"
        name="account_type"
        rules={[{ required: true, message: 'Input the account type!' }]}
      >
        <Select
          placeholder="Select a account type"
          allowClear
        >
          <Option value="CORRENTE">Checking Account </Option>
          <Option value="POUPANCA">Savings Account</Option>
        </Select>
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