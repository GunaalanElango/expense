export const ADD_STATEMENT = "ADD_STATEMENT";
export const UPDATE_STATEMENT = "UPDATE_STATEMENT";

const addStatement = (type, amount, category, description) => {
  return {
    type: ADD_STATEMENT,
    statement: {
      type,
      amount,
      category,
      description,
      id: Date.now(),
      date: Date.now(),
    },
  };
};

const updateStatement = (id, amount, category, description) => {
  return {
    type: UPDATE_INCOME_EXPENSE,
    id,
    amount,
    category,
    description,
  };
};

export default {
  addStatement,
  updateStatement,
};
