import getList from './utils/getList';
import updateListItem from './utils/updateListItem';
import addListItem from './utils/addListItem';
import removeListItem from './utils/removeListItem';


const url = 'http://localhost:8000/';


export const getProblems = async (dispatch, currentUser) => {
  const result = await getList({ url: url + 'problems/', body: currentUser }, dispatch);
  if (result) {
    dispatch({ type: 'UPDATE_PROBLEMS', payload: result });
  };
};


export const addProblemItem = async (addFields, dispatch, currentUser) => {
  const result = await addListItem({ url: url + 'problems/', token: currentUser, addFields: addFields }, dispatch);
  if (result) {
    dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          open: true,
          severity: 'success',
          message: 'Информация успешно добавлена!',
        },
    });
    return result;
  };
  return null;
};


export const updateProblemItem = async (updatedFields, itemId, dispatch, currentUser) => {
  const result = await updateListItem({ url: url + 'problems/', token: currentUser, updatedFields: updatedFields, itemId: itemId }, dispatch);
  if (result) {
    dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          open: true,
          severity: 'success',
          message: 'Информация успешно обновлена!',
        },
    });
    return result;
  };
  return null;
};


export const removeProblemItem = async (itemId, dispatch, currentUser) => {
  const result = await removeListItem({ url: url + 'problems/', token: currentUser, itemId: itemId }, dispatch);
  if (result) {
    dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          open: true,
          severity: 'success',
          message: 'Запись успешно удалена!',
        },
    });
    return result;
  };
  return null;
};