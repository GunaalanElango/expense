export const FORM_INPUT_CHANGE = "FORM_INPUT_CHANGE";

export const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_INPUT_CHANGE:
      let updatedValues = {
        ...state.inputValues,
        [action.id]: action.value,
      };

      let updatedValidity = {
        ...state.inputValidity,
        [action.id]: action.isValid,
      };

      let updatedFromIsValid = true;
      for (const key in updatedValidity) {
        updatedFromIsValid = updatedFromIsValid && updatedValidity[key];
      }

      return {
        inputValues: updatedValues,
        inputValidity: updatedValidity,
        formIsValid: updatedFromIsValid,
      };
    default:
      return state;
  }
};
