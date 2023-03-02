import { useSelector } from 'react-redux';

import TabPanel from 'components/tab-panel/TabPanel';
import AnswerPage from 'containers/answer/AnswerPage';
import Dashboard from 'containers/dashboard/Dashboard';
import './HomPage.scss';

export default function HomePage() {
  const tabId = useSelector((state) => state.tab);

  return (
    <div className="tab-container">
      {/* <div className="tab-header">
        <Header />
      </div> */}
      <div className="tab-content">
        <TabPanel onClick={() => console.log('...')} value={tabId} index={0}>
          <AnswerPage />
        </TabPanel>
        <TabPanel value={tabId} index={1}>
          <Dashboard />
        </TabPanel>
      </div>
    </div>
  );
}
