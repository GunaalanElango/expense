import { ADD_CATEGORY } from "../actions/category";

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return [...state, action.category];
    default:
      return state;
  }
};

export default reducer;
