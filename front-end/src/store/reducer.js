// == Initial State
const initialState = {
  search: '',
  currentSearch: '',
  loading: false,
  videos: []
};

// == Types
const INPUT_CHANGED = 'INPUT_CHANGED';
export const FORM_SUBMITTED = 'FORM_SUBMITTED';
const VIDEOS_CAUGHT = 'VIDEOS_CAUGHT';
const VIDEOS_LOADED = 'VIDEOS_LOADED';

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
        currentSearch: action.currentSearch,
        videos: action.videos,
        loading: true
      };
    case VIDEOS_LOADED:
      return {
        ...state,
        loading: false
      }
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

export const videosCaught = (currentSearch, videos) => ({
  type: VIDEOS_CAUGHT,
  currentSearch,
  videos
});

export const videosLoaded = () => ({
  type: VIDEOS_LOADED
});

export const formSubmitted = () => ({
  type: FORM_SUBMITTED
});

// == Selectors


// == Export
export default reducer;
