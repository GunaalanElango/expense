export const ADD_CATEGORY = "ADD_CATEGORY";

export const addCategory = (name) => {
  return {
    type: ADD_CATEGORY,
    category: {
      id: Date.now(),
      name,
    },
  };
};
