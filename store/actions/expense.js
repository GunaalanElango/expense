export const ADD_EXPENSE = "ADD_EXPENSE";

export const addExpense = (amount, category, description) => {
  return {
    type: ADD_EXPENSE,
    expense: {
      amount,
      description,
    },
  };
};
