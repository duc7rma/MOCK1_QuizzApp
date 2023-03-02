import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { RoutePaths } from 'routes/route-constants';
import './Tabs.scss';

function TabsHeader() {
  const navigate = useNavigate();
  const [tabACtive, setTabActive] = useState('play');

  return (
    <div className="tabs-header">
      <span
        className={`tab play ${tabACtive === 'play' ? 'active' : ''} `}
        onClick={() => {
          setTabActive('play');
          navigate(RoutePaths.GO_TO_PLAY);
        }}
      >
        Go To Play
      </span>
      <span
        className={`tab dashboard ${tabACtive === 'dashboard' ? 'active' : ''} `}
        onClick={() => {
          setTabActive('dashboard');
          navigate(RoutePaths.DASHBOARD);
        }}
      >
        Dashboard
      </span>
    </div>
  );
}

export default TabsHeader;
