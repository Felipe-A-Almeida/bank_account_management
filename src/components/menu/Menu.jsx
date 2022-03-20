import React from 'react';
import './menu.css';

import { Menu } from 'antd';
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <div>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          {new Array(15).fill(null).map((_, index) => {
            const key = index + 1;
            return <Menu.Item key={key}><Link to="/invoices">{`nav ${key}`}</Link></Menu.Item>;
          })}
        </Menu>
      </div>
    )
  }
}

export default Header