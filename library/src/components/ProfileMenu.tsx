import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useAuth0 } from "@auth0/auth0-react";

export default function ProfileMenu() {
  const history = useHistory();
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement|null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleClose();
    history.push(`/profile/${user.nickname}`);
  };

  const handleLogout = () => {
    handleClose();
    logout()
  };

  if (isLoading) {
    return (
      <span>&#x29D6;</span>
    );
  }
  else if (isAuthenticated) {
    return (
      <span>
        <a aria-controls="profile-menu" aria-haspopup="true" onClick={handleClick}>
          <img className="ProfileImage" src={user.picture} alt={user.name} />
        </a>
        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleProfile}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </span>
    );
  }
  else {
    return (
      <a onClick={() => loginWithRedirect()}>Login</a>
    );
  }
}
