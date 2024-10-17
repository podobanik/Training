import React, { useEffect } from 'react';
import { useValue } from '../context/ContextProvider.jsx';
import { jwtDecode } from 'jwt-decode';
import { logout } from '../actions/user';

const useCheckToken = () => {
  const {
    state: {
      currentUser,
    },
    dispatch,
  } = useValue();
  useEffect(() => {
    if (currentUser) {
      const decodedToken = jwtDecode(currentUser.token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout(dispatch);
      }
    }
  }, []);
};

export default useCheckToken;
