import React from 'react';

import { Menu } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

class Header extends React.Component {
  render() {

    const menuItems = [{
      name: 'Users',
      link: '/',
      target: '_self'
    }, {
      name: 'GitHub',
      link: 'https://github.com/Felipe-A-Almeida/bank_account_management',
      icon: <GithubOutlined />,
      target: '_blank'
    }]

    return (
      <div>
        <Menu theme="dark" mode="horizontal" className='display-flex justify-content-end'>
          {menuItems.map((menuItem, index) => {
            const key = index + 1;
            return <Menu.Item key={key}>
              <a className="menu-item display-flex" href={ menuItem.link } target={menuItem.target}>
                <div>
                  { menuItem.icon }
                </div>
                <div>
                  {menuItem.name}
                </div>
              </a>
            </Menu.Item>;
          })}
        </Menu>
      </div>
    )
  }
}

export default Header