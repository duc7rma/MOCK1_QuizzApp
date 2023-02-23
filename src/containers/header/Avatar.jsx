import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import { EAuthToken } from 'variables';
import { logOut } from 'services/auth-service';
import { removeItem } from 'utils/storage-utils';
import { RoutePaths } from 'routes/route-constants';

export default function MyAvatar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    const refresh_token = localStorage.getItem(EAuthToken.REFRESH_TOKEN);
    console.log('refresh_token:', refresh_token);
    const res = await logOut({ refresh_token });

    if (res.statusCode === 200) {
      removeItem(EAuthToken.REFRESH_TOKEN);
      removeItem(EAuthToken.ACCESS_TOKEN);

      navigate(RoutePaths.SIGN_IN);
    }
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
          <Avatar alt="Remy Sharp" src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e" />
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
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
