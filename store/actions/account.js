export const ADD_INCOME_EXPENSE = "ADD_INCOME_EXPENSE";
export const UPDATE_INCOME_EXPENSE = "UPDATE_INCOME_EXPENSE";

const addIncomeExpense = (type, amount, category, description) => {
  return {
    type: ADD_INCOME_EXPENSE,
    incomeExpense: {
      type,
      amount,
      category,
      description,
      id: Date.now(),
      date: Date.now(),
    },
  };
};

const updateIncomeExpense = (id, amount, category, description) => {
  return {
    type: UPDATE_INCOME_EXPENSE,
    id,
    amount,
    category,
    description,
  };
};

export default {
  addIncomeExpense,
  updateIncomeExpense,
};
