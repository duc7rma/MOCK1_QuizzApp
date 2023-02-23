import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { changeTab } from 'stores/tabSlice';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function MyTabs() {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch(changeTab(newValue));
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Admin" {...a11yProps(0)} />
            <Tab label="Go to play" {...a11yProps(1)} />
          </Tabs>
        </Box>
      </Box>
    </>
  );
}

export default MyTabs;
