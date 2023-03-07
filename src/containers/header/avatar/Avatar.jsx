import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import LogoutIcon from '@mui/icons-material/Logout';
import PasswordIcon from '@mui/icons-material/Password';
import { useSelector } from 'react-redux';

import { RoutePaths } from 'routes/route-constants';
import { logOut } from 'services/auth-service';
import { EAuthToken } from 'variables';
import { removeItem } from 'utils/storage-utils';

export default function MyAvatar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const avatar_link = useSelector((state) => state.user.user.avatar_link);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    const refresh_token = localStorage.getItem(EAuthToken.REFRESH_TOKEN);
    await logOut({ refresh_token });

    removeItem(EAuthToken.REFRESH_TOKEN);
    removeItem(EAuthToken.ACCESS_TOKEN);

    navigate(RoutePaths.SIGN_IN, { replace: true });
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Stack direction="row" spacing={2}>
          <Avatar alt="" src={avatar_link} />
        </Stack>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          onClick={() => {
            navigate(RoutePaths.CHANGE_PASSWORD);
            handleClose();
          }}
        >
          <PasswordIcon /> &nbsp; Change Password
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <LogoutIcon /> &nbsp; Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
