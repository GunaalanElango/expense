import { ADD_CATEGORY } from "../actions/category";

const initialState = {
  income: ["salary", "others"],
  expense: ["food", "stationery", "home"],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return [...state, action.category];
    default:
      return state;
  }
};

export default reducer;
