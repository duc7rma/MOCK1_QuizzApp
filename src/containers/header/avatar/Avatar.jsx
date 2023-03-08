import { useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Dropdown } from 'antd';
import { useSelector } from 'react-redux';

import { RoutePaths } from 'routes/route-constants';
import { logOut } from 'services/auth-service';
import { removeItem } from 'utils/storage-utils';
import { EAuthToken } from 'variables';
import './Avatar.scss';

export default function MyAvatar() {
  const navigate = useNavigate();

  const avatar_link = useSelector((state) => state.user.user.avatar_link);

  const handleLogout = async () => {
    const refresh_token = localStorage.getItem(EAuthToken.REFRESH_TOKEN);
    await logOut({ refresh_token });

    removeItem(EAuthToken.REFRESH_TOKEN);
    removeItem(EAuthToken.ACCESS_TOKEN);

    navigate(RoutePaths.SIGN_IN, { replace: true });
  };

  const items = [
    {
      key: '1',

      label: (
        <div className="avatar-item" onClick={() => navigate(RoutePaths.CHANGE_PASSWORD)}>
          Change password
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div className="avatar-item" onClick={handleLogout}>
          Logout
        </div>
      ),
    },
  ];

  return (
    <div className="avatar">
      <Dropdown menu={{ items }} placement="bottomLeft">
        <Stack direction="row" spacing={2}>
          <Avatar alt="" src={avatar_link} />
        </Stack>
      </Dropdown>
    </div>
  );
}
