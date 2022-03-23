function formsReducer(state, action) {
  switch (action.type) {
    case 'GET_FORMS':
      return [...action.payload];
    case 'ADD_FORM':
      return [...state, action.payload];
    case 'DELETE_FORM':
      return state.filter(form => form.id !== action.payload);
    case 'EDIT_FORM':
      return [...state, action.payload];
    default:
      return state;
  }
}

export default formsReducer;
