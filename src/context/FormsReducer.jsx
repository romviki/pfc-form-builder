function formsReducer(state, action) {
  switch (action.type) {
    case 'GET_FORMS':
      return [...action.payload];
    case 'ADD_FORM':
      return [...state, action.payload];
    default:
      return state;
  }
}

export default formsReducer;
