import { useSelector } from 'react-redux';

import TabPanel from 'components/tab-panel/TabPanel';
import AnswerPage from 'containers/answer/AnswerPage';
import './HomPage.scss';
import Header from 'containers/header/Header';
import Dashboard from 'containers/dashboard/Dashboard';

export default function HomePage() {
  const tabId = useSelector((state) => state.tab);

  return (
    <div className="tab-container">
      <div className="tab-header">
        <Header />
      </div>
      <div className="tab-content">
        <TabPanel value={tabId} index={0}>
          <Dashboard />
        </TabPanel>
        <TabPanel value={tabId} index={1}>
          <AnswerPage />
        </TabPanel>
      </div>
    </div>
  );
}
