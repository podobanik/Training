import { Dashboard, Logout, Settings } from '@mui/icons-material';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../actions/user.js';
import { useValue } from '../../../context/ContextProvider.jsx';
import useCheckToken from '../../../hooks/use-checktoken.hook.js';
import Profile from './Profile.jsx';

const UserMenu = ({ anchorUserMenu, setAnchorUserMenu }) => {
  //useCheckToken();
  const {
    dispatch,
    state: {
      currentUser,
    },
  } = useValue();
  const handleCloseUserMenu = () => {
    setAnchorUserMenu(null);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    logout(dispatch);
  };

  return (
    <>
      <Menu
        anchorEl={anchorUserMenu}
        open={Boolean(anchorUserMenu)}
        onClose={handleCloseUserMenu}
        onClick={handleCloseUserMenu}
      >
          <MenuItem
            onClick={() =>
              dispatch({
                type: 'UPDATE_PROFILE',
                payload: {
                  open: true,
                  file: null,
                  photoURL: currentUser?.photoURL,
                },
              })
            }
          >
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Профиль
          </MenuItem>
        <MenuItem onClick={() => navigate('dashboard')}>
          <ListItemIcon>
            <Dashboard fontSize="small" />
          </ListItemIcon>
          Панель инструментов
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Выход
        </MenuItem>
      </Menu>
      <Profile />
    </>
  );
};

export default UserMenu;
