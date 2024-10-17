import { Lock } from '@mui/icons-material';
import { Alert, AlertTitle, Button, Container } from '@mui/material';
import React from 'react';
import { useValue } from '../../../context/ContextProvider.jsx';

const AccessMessage = () => {
  const { dispatch } = useValue();
  return (
    <Container sx={{ py: 10 }}>
      <Alert severity="error" variant="outlined">
        <AlertTitle>Доступ запрещён!</AlertTitle>
        Пожалуйста зарегистрируйтесь или авторизуйтесь, чтобы получить доступ к этой странице.
        <Button
          variant="outlined"
          sx={{ ml: 2 }}
          startIcon={<Lock />}
          onClick={() => dispatch({ type: 'OPEN_LOGIN' })}
        >
          Войти
        </Button>
      </Alert>
    </Container>
  );
};

export default AccessMessage;