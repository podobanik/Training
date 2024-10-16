import axios from 'axios';

const refreshToken = async (
  { url, body },
  dispatch
) => {
  const headers = { 'Content-Type': 'application/json' };
  body = JSON.stringify(body);
  try {
    const response = await axios.post(url, body, {headers: headers});
    if (!response.status === 200) {
      if (response.status === 401)
        dispatch({ type: 'UPDATE_USER', payload: null });
      throw new Error(response.statusText);
    }
    return response.data;;
  } catch (error) {
    dispatch({
      type: 'UPDATE_ALERT',
      payload: { open: true, severity: 'error', message: "Требуется повторная авторизация" },
    });
    console.log(error);
    return null;
  }
};

export default refreshToken;