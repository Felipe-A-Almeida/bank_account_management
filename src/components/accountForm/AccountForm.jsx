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
      allBanks: [],
      form: {},
    };
    this.fields = {
      accountName: '',
      agency: '',
      agencyDigit: '',
      accountNumber: '',
      accountDigit: '',
      accountType: '',
      bank: '',
      user: `/users/${this.props.id}`,
    }
    this.getBanks();
    if (props.accountId) this.getSelectedAccount();
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

  getSelectedAccount = () => {
    fetch(`https://frontendapi.cm2tech.com.br/bank_accounts/${this.props.accountId}`, {
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
    if(this.props.accountId) {
      if(Object.entries(this.state.form).length > 0) {        
        const object = {
          ...this.fields,
          ...this.state.form
        }
        console.log(JSON.stringify(object));
        
        fetch(`https://frontendapi.cm2tech.com.br/bank_accounts/${this.props.accountId}`, {
          headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            
          },
          body: JSON.stringify(object),
          method: "PUT",
        })
        .then(response => response.json())
        .then(() => {
          window.location.href = '../bank_accounts';
        })
        
        
      }else {
        console.log('NÃO MODIFICAOD values from form:', this.state.form);
      }
    } else {
      const object = {
        ...this.fields,
        ...this.state.form
      }
      
      fetch('https://frontendapi.cm2tech.com.br/bank_accounts', {
        headers: {
          Accept: 'application/json',
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify(object),
        method: "POST",
      })
        .then(response => response.json())
        .then((data) => {
          console.log(data);
          window.location.href = `../../${this.props.id}/bank_accounts`;
        })
      
    }
  };

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
        initialValues={{
          size: 'default',
        }}
        onValuesChange={this.onValuesChange}
        size='default'
        onFinish={this.onFinish}
        fields={ (this.state.fields) || '' }
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