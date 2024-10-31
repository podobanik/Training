import {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import reducer from './reducer';

const initialState = {
  currentUser: null,
  openLogin: false,
  loading: false,
  alert: { open: false, severity: 'info', message: '' },
  profile: { open: false },
  users: [],
  problems: [],
  journals: [],
  folders: [],
  userInfo: null,
};

const Context = createContext(initialState);

export const useValue = () => {
  return useContext(Context);
};

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (currentUser) {
      dispatch({ type: 'UPDATE_USER', payload: currentUser });
      dispatch({ type: 'UPDATE_USER_INFO', payload: userInfo});
    }
  }, []);


  return (
    <Context.Provider value={{ state, dispatch }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
