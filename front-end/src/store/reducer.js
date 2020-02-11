// == Initial State
const initialState = {
  search: '',
  videos: []
};

// == Types
const INPUT_CHANGED = 'INPUT_CHANGED';
export const FORM_SUBMITTED = 'FORM_SUBMITTED';
const VIDEOS_CAUGHT = 'VIDEOS_CAUGHT';

// == Reducer
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case INPUT_CHANGED:
      return {
        ...state,
        [action.name]: action.value,
      };
    case VIDEOS_CAUGHT:
      return {
        ...state,
        videos: action.videos
      };
    case FORM_SUBMITTED:
      return {
        ...state,
        search: ''
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

export const videosCaught = (videos) => ({
  type: VIDEOS_CAUGHT,
  videos
});

export const formSubmitted = () => ({
  type: FORM_SUBMITTED
});

// == Selectors


// == Export
export default reducer;
