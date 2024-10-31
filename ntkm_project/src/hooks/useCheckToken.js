import { useEffect } from 'react';
import { useValue } from '../context/ContextProvider';
import { jwtDecode } from 'jwt-decode/build/cjs';

import { logout } from '../actions/user';

const useCheckToken = () => {
  const {
    state: {
      currentUser,
    },
    dispatch,
  } = useValue();
  const refresh_url = 'http://localhost:8000/token/refresh/';
  useEffect(() => {
    if (currentUser) {
      const decodedRefreshToken = jwtDecode(currentUser.refresh);
      const decodedAccessToken = jwtDecode(currentUser.access);
      if (decodedAccessToken.exp * 1000 < new Date().getTime()) {
        if (decodedRefreshToken.exp * 1000 < new Date().getTime()){
          logout(dispatch);
        };
        const newAccess = refreshToken({ url: refresh_url, body: currentUser.refresh}, dispatch);
        if (newAccess) {
          const oldRefresh = currentUser.refresh;
          const result = {newAccess, oldRefresh}
          dispatch({ type: 'UPDATE_USER', payload: result})
        } else {
          logout(dispatch);
        };
      };
    };
  }, []);
};

export default useCheckToken;
