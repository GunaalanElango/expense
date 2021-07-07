import { ADD_CATEGORY } from "../actions/category";

const initialState = [
  { id: 1, name: "Petrol" },
  { id: 2, name: "Lunch" },
  { id: 3, name: "Dinner" },
  { id: 4, name: "Stationery" },
];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return [...state, action.category];
    default:
      return state;
  }
};

export default reducer;
