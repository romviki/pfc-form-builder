function globalReducer(state, action) {
  switch (action.type) {
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'SET_LOADING':
      return { ...state, loading: true };
    case 'CLEAR_LOADING':
      return { ...state, loading: false };
    default:
      return state;
  }
}

export default globalReducer;
