const reducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_LOGIN':
      return { ...state, openLogin: true };
    case 'CLOSE_LOGIN':
      return { ...state, openLogin: false };

    case 'START_LOADING':
      return { ...state, loading: true };
    case 'END_LOADING':
      return { ...state, loading: false };

    case 'UPDATE_ALERT':
      return { ...state, alert: action.payload };

    case 'UPDATE_USER':
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
      return { ...state, currentUser: action.payload };

    case 'UPDATE_USER_INFO':
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      return { ...state, userInfo: action.payload };

    case 'UPDATE_USERS':
      return { ...state, users: action.payload };

    case 'UPDATE_PROBLEMS':
      return { ...state, problems: action.payload };

    case 'UPDATE_JOURNALS':
      return { ...state, journals: action.payload };

    case 'UPDATE_FOLDERS':
      return { ...state, folders: action.payload };

    case 'UPDATE_STATUSES':
      return { ...state, problem_status_all: action.payload };

    default:
      throw new Error('No matched action!');
  }
};

export default reducer;
