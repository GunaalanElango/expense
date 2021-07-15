import { ADD_STATEMENT, UPDATE_STATEMENT } from "../actions/account";

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
  statements: [],
  totalBalance: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_STATEMENT:
      let updatedStatement = [...state.statements, action.statement];

      return {
        totalBalance: findTotalBalance(updatedStatement),
        statements: updatedStatement,
      };

    case UPDATE_STATEMENT:
      let updated = [...state.statements];

      let index = updated.findIndex((inex) => inex.id == action.id);

      updated[index].category = action.category;
      updated[index].amount = action.amount;
      updated[index].description = action.description;

      return {
        totalBalance: findTotalBalance(updated),
        statements: updated,
      };
    default:
      return state;
  }
};

export default reducer;