function formsReducer(state, action) {
  switch (action.type) {
    case 'GET_FORMS':
      return [...action.payload];
    case 'GET_FORM_BY_ID':
      return state.filter(form => form._id === action.payload);
    case 'ADD_FORM':
      return [...state, action.payload];
    case 'EDIT_FORM':
      return state.map(form =>
        form._id === action.payload._id ? action.payload : form
      );
    case 'DELETE_FORM':
      return state.filter(form => form._id !== action.payload);
    default:
      return state;
  }
}

export default formsReducer;
