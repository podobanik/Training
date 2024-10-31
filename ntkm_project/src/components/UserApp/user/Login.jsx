import { Close, Send } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Switch,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { login, register } from '../../../actions/user.js';
import { useValue } from '../../../context/ContextProvider.jsx';
import PasswordField from './PasswordField.jsx';

const Login = () => {
  const {
    state: { openLogin },
    dispatch,
  } = useValue();
  const [title, setTitle] = useState('Авторизация');
  const [isRegister, setIsRegister] = useState(false);
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const isActiveRef = useRef();
  const isStaffRef = useRef();
  const isSuperUserRef = useRef();

  const handleClose = () => {
    dispatch({ type: 'CLOSE_LOGIN' });
    setIsRegister(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (!isRegister) return login({ email, password }, dispatch);
    const username = userNameRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    const is_active = isActiveRef.current.value;
    const is_staff = isStaffRef.current.value;
    const is_superuser = isSuperUserRef.current.value;
    if (password !== confirmPassword)
      return dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          open: true,
          severity: 'error',
          message: 'Пароли не совпадают',
        },
      });
    register({ username: username, email: email, password: password, is_active: is_active, is_staff: is_staff, is_superuser: is_superuser }, dispatch);
    setIsRegister(false);
  };

  useEffect(() => {
    isRegister ? setTitle('Регистрация') : setTitle('Авторизация');
  }, [isRegister]);
  return (
    <Dialog open={openLogin} onClose={handleClose}>
      <DialogTitle>
        {title}
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <DialogContentText>
            Пожалуйста заполните выделенные поля
          </DialogContentText>
          {isRegister && (
            <TextField
              autoFocus
              margin="normal"
              variant="standard"
              id="username"
              label="Логин"
              type="text"
              fullWidth
              inputRef={userNameRef}
              inputProps={{ minLength: 2 }}
              required
            />
          )}
          <TextField
            autoFocus={!isRegister}
            margin="normal"
            variant="standard"
            id="email"
            label="Адрес электронной почты"
            type="email"
            fullWidth
            inputRef={emailRef}
            required
          />
          <PasswordField {...{ passwordRef }} />
          {isRegister && (
            <PasswordField
              passwordRef={confirmPasswordRef}
              id="confirmPassword"
              label="Подтвердите пароль"
            />
          )}
          {isRegister && (
            <Switch inputRef={isActiveRef} inputProps={{ 'aria-label': 'Активный пользователь' }} label="Активный пользователь" />
          )}
          {isRegister && (
            <Switch inputRef={isStaffRef} inputProps={{ 'aria-label': 'Администратор' }} label="Администратор" />
          )}
          {isRegister && (
            <Switch inputRef={isSuperUserRef} inputProps={{ 'aria-label': 'Суперпользователь' }} label="Суперпользователь" />
          )}
        </DialogContent>
        <DialogActions sx={{ px: '19px' }}>
          <Button type="submit" variant="contained" endIcon={<Send />}>
            Авторизоваться
          </Button>
        </DialogActions>
      </form>
      <DialogActions sx={{ justifyContent: 'left', p: '5px 24px' }}>
        {isRegister
          ? 'Уже есть аккаунт? Авторизуйтесь! '
          : 'Нет аккаунта? Зарегистрируйтесь! '}
        <Button onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Авторизация' : 'Регистрация'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Login;
