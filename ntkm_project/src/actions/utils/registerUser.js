import axios from 'axios';

const registerUser = async (
  { url, body },
  dispatch
) => {
  const headers = { 'Content-Type': 'application/json' }
  body = JSON.stringify(body);
  try {
    const response = await axios.post(url, body, {headers:headers});
    if (!response.status === 201) {
      if (response.status === 500)
      throw new Error(response.statusText);
    }
    return response;
  } catch (error) {
    dispatch({
      type: 'UPDATE_ALERT',
      payload: { open: true, severity: 'error', message: "Заданный пользователь уже существует" },
    });
    console.log(error);
    return null;
  }
};

export default registerUser;