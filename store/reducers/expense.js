import { ADD_EXPENSE } from "../actions/expense";

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EXPENSE:
      return [...state, action.expense];
    default:
      return state;
  }
};

export default reducer;
