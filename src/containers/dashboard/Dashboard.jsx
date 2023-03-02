import { Tabs } from 'antd';

import { useNavigate } from 'react-router-dom';

import Questions from './questions/Questions';
import User from './users/User';
import './Dashboard.scss';
import { RoutePaths } from 'routes/route-constants';

const Dashboard = () => {
  const navigate = useNavigate();

  const items = [
    {
      key: 'questions',
      label: `Questions`,
      children: <Questions />,
    },
    {
      key: 'users',
      label: `Users`,
      children: <User />,
    },
  ];

  const handleChangeTab = (e) => {
    if (e === 'users') {
      return navigate(RoutePaths.USER);
    }

    return navigate(RoutePaths.QUESTIONS);
  };

  return (
    <div className="dashboard-container">
      <Tabs defaultActiveKey="questions" items={items} onChange={handleChangeTab} />
    </div>
  );
};

export default Dashboard;
