import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { RoutePaths } from 'routes/route-constants';
import { useDispatch } from 'react-redux';
import { TAB_HEADER } from 'constants/tabs';
import { changeTab } from 'stores/tabSlice';
import './Tabs.scss';

function TabsHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tabACtive, setTabActive] = useState('play');

  return (
    <div className="tabs-header">
      <span
        className={`tab play ${tabACtive === 'play' ? 'active' : ''} `}
        onClick={() => {
          dispatch(changeTab(TAB_HEADER.GO_TO_PLAY));
          setTabActive('play');
          navigate(RoutePaths.GO_TO_PLAY);
        }}
      >
        Go To Play
      </span>
      <span
        className={`tab dashboard ${tabACtive === 'dashboard' ? 'active' : ''} `}
        onClick={() => {
          dispatch(changeTab(TAB_HEADER.ADMIN));
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
