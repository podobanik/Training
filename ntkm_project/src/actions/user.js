import getToken from './utils/getToken.js';
import registerUser from './utils/registerUser.js';
import { v4 as uuidv4 } from 'uuid';
import uploadFile from '../firebase/uploadFile.js';
import getUserInfo from './utils/getUserInfo.js';
import getUserId from './utils/getUserId.js';
import axios from 'axios';


const url = 'http://localhost:8000/';

export const register = async (user, dispatch) => {
  dispatch({ type: 'START_LOADING' });

  const result = await registerUser(
    { url: url + 'register/', body: user },
    dispatch
  );
  if (result) {
    dispatch({ type: 'CLOSE_LOGIN' });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'Ваш аккаунт был успешно создан!',
      },
    });
  }

  dispatch({ type: 'END_LOADING' });
};

export const login = async (user, dispatch) => {
  dispatch({ type: 'START_LOADING' });

  const result = await getToken({ url: url + 'token/', body: user }, dispatch);
  const userId = await getUserId({ url: url + 'auth/users/me/', body: result.access}, dispatch)
  const userInfo = await getUserInfo({ url: url + 'users/' + userId, body: result.access}, dispatch)
  if (result) {
    dispatch({ type: 'UPDATE_USER', payload: result });
    dispatch({ type: 'UPDATE_USER_INFO', payload: userInfo });
    dispatch({ type: 'CLOSE_LOGIN' });
  }

  dispatch({ type: 'END_LOADING' });
};

export const updateProfile = async (userInfo, updatedFields, dispatch) => {
  dispatch({ type: 'START_LOADING' });

  const { username, is_active, is_staff, file } = updatedFields;
  let body = { username, is_active, is_staff };
  try {
    if (file) {
      const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop();
      const photoURL = await uploadFile(
        file,
        `profile/${userInfo?.id}/${imageName}`
      );
      body = { ...body, photoURL };
    }
    const result = await axios.patch(
      {
        url: url + '/updateProfile',
        body,
        token: currentUser.access,
      },
      dispatch
    );
    if (result) {
      dispatch({ type: 'UPDATE_USER', payload: { ...currentUser, ...result } });
      dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          open: true,
          severity: 'success',
          message: 'Your profile has been updated successfully',
        },
      });
      dispatch({
        type: 'UPDATE_PROFILE',
        payload: { open: false, file: null, photoURL: result.photoURL },
      });
    }
  } catch (error) {
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'error',
        message: error.message,
      },
    });
    console.log(error);
  }

  dispatch({ type: 'END_LOADING' });
};

export const getUsers = async (dispatch, currentUser) => {
  const result = await fetchData(
    { url, method: 'GET', token: currentUser.token },
    dispatch
  );
  if (result) {
    dispatch({ type: 'UPDATE_USERS', payload: result });
  }
};

export const updateStatus = (updatedFields, userId, dispatch, currentUser) => {
  return fetchData(
    {
      url: `${url}/updateStatus/${userId}`,
      method: 'PATCH',
      token: currentUser.token,
      body: updatedFields,
    },
    dispatch
  );
};

export const logout = (dispatch) => {
  dispatch({ type: 'UPDATE_USER', payload: null });
  dispatch({ type: 'UPDATE_USER_INFO', payload: {} });
  dispatch({ type: 'UPDATE_USERS', payload: [] });
};
