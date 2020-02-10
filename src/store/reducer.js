// == Initial State
const initialState = {
  search: '',
};

// == Types
const INPUT_CHANGED = 'INPUT_CHANGED';

// == Reducer
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case INPUT_CHANGED:
      return {
        ...state,
        [action.name]: action.value,
      };

    default:
      return state;
  }
};

// == Action Creators
export const inputChanged = (name, value) => ({
  type: INPUT_CHANGED,
  name,
  value,
});


// == Selectors


// == Export
export default reducer;
