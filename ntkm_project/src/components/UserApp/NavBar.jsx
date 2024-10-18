import React from 'react';
import {
  AppBar,
  Button,
  Container,
  Toolbar,
  Typography,
} from '@mui/material';
import { Lock } from '@mui/icons-material';

import { useValue } from '../../context/ContextProvider.jsx';
import UserIcons from './user/UserIcons.jsx';


const NavBar = () => {
  const {
    state: { currentUser },
    dispatch,
  } = useValue();


  return (
    <>
      <AppBar>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              component="h1"
              noWrap
              sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
            >
              Добро пожаловать! Пожалуйста пройдите авторизацию.
            </Typography>
            <Typography
              variant="h6"
              component="h1"
              noWrap
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              Авторизация
            </Typography>
            {!currentUser ? (
              <Button
                color="inherit"
                startIcon={<Lock />}
                onClick={() => dispatch({ type: 'OPEN_LOGIN' })}
              >
                Авторизация
              </Button>
            ) : (
              <UserIcons />
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default NavBar;
