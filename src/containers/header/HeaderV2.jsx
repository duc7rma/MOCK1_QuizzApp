import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';

const items = [
  {
    label: 'Play',
    key: 'play',
    icon: <MailOutlined />,
  },
  {
    label: 'Dashboard',
    key: 'dashboard',
    icon: <SettingOutlined />,
    children: [
      {
        label: 'Questions',
      },
      {
        label: 'Users',
      },
    ],
  },
];

const HeaderV2 = () => {
  const [current, setCurrent] = useState('play');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};
export default HeaderV2;
