const initialState = {
  incomeAndExpenses: [
    {
      id: 1,
      amount: 1300,
      category: "food",
      description: "dinner",
      type: "expense",
      date: "",
    },
  ],
  totalAmount: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
