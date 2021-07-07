export const FORM_INPUT_CHANGE = "FORM_INPUT_CHANGE";

export const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_INPUT_CHANGE:
      let updatedValues = { ...state.inputValues };
      if (action.id in state.inputValues) {
        updatedValues = {
          ...state.inputValues,
          [action.id]: action.value,
        };
      }

      let updatedValidity = { ...state.inputValidity };
      if (action.id in state.inputValidity) {
        updatedValidity = {
          ...state.inputValidity,
          [action.id]: action.isValid,
        };
      }

      let updatedFromIsValid = false;
      for (const key in updatedValidity) {
        if (!updatedValidity[key]) {
          updatedFromIsValid = false;
          break;
        } else {
          updatedFromIsValid = true;
        }
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
