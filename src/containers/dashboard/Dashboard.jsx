import { Tabs } from 'antd';

import Questions from './questions/Questions';
import User from './users/User';
import './Dashboard.scss';

const Dashboard = () => {
  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: '1',
      label: `Questions`,
      children: <Questions />,
    },
    {
      key: '2',
      label: `Users`,
      children: <User />,
    },
  ];

  return (
    <div className="dashboard-container">
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
    </div>
  );
};

export default Dashboard;
