import { ADD_INCOME_EXPENSE, UPDATE_INCOME_EXPENSE } from "../actions/account";

const findTotalBalance = (arr) => {
  let incomeArr = arr.filter((incomeExpense) => incomeExpense.type == "income");

  let expenseArr = arr.filter(
    (incomeExpense) => incomeExpense.type == "expense"
  );

  let incomeTotal = incomeArr.reduce((acc, cur) => {
    return acc + parseInt(cur.amount);
  }, 0);

  let expenseTotal = expenseArr.reduce((acc, cur) => {
    return acc + parseInt(cur.amount);
  }, 0);

  return incomeTotal - expenseTotal;
};

const initialState = {
  incomeAndExpenses: [],
  totalBalance: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INCOME_EXPENSE:
      let updatedIncomeExpense = [
        ...state.incomeAndExpenses,
        action.incomeExpense,
      ];

      return {
        totalBalance: findTotalBalance(updatedIncomeExpense),
        incomeAndExpenses: updatedIncomeExpense,
      };

    case UPDATE_INCOME_EXPENSE:
      let updated = [...state.incomeAndExpenses];

      let index = updated.findIndex((inex) => inex.id == action.id);

      updated[index].category = action.category;
      updated[index].amount = action.amount;
      updated[index].description = action.description;

      return {
        totalBalance: findTotalBalance(updated),
        incomeAndExpenses: updated,
      };
    default:
      return state;
  }
};

export default reducer;
