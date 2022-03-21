import React from 'react';

import {
  Form,
  Input,
  Button,
  Select,
} from 'antd';

const { Option } = Select;

class AccountForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: `/users/${this.props.id}`,
      allBanks: [],
    };
    this.getBanks();
  }

  getBanks = () => {
    fetch(`https://frontendapi.cm2tech.com.br/banks`, {
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
        
      },
      method: "GET",
    })
      .then(response => response.json())
      .then((data) => {
        this.setState({ allBanks: data });
      });
    
  }

  onFinish = () => {
    delete this.state.allBanks;
    console.log('Received values from form:', this.state);
    
    
    fetch('https://frontendapi.cm2tech.com.br/bank_accounts', {
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify(this.state),
      method: "POST",
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        window.location.href = `../../${this.props.id}/bank_account`;
      })
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
        label="Account Name"
        name="accountName"
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
        name="agencyDigit"
        rules={[{ required: true, message: 'Input the agency digit!' }]}
      >
        <Input />
      </Form.Item> 
      <Form.Item
        label="Account Number"
        name="accountNumber"
        rules={[{ required: true, message: 'Input the account number!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Account Digit"
        name="accountDigit"
        rules={[{ required: true, message: 'Input the account digit!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item 
        label="Account Type"
        name="accountType"
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
      <Form.Item 
        label="Bank"
        name="bank"
        rules={[{ required: true, message: 'Input a bank!' }]}
      >
        <Select
          placeholder="Select a bank"
          allowClear
        >
          {this.state.allBanks.map((bank, index) => <Option key={index} value={ '/banks/' + bank.id} >{bank.name}</Option>)}
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

export default AccountForm;