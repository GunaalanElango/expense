import { ADD_CATEGORY } from "../actions/category";

const initialState = {
  incomeCategories: [],
  expenseCategories: [
    { id: 1, name: "food" },
    { id: 2, name: "petrol" },
    { id: 3, name: "stationery" },
  ],
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
