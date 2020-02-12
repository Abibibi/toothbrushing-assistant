// == Initial State
const initialState = {
  search: '',
  currentSearch: '',
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
        videos: action.videos
      };
    case VIDEOS_LOADED:
      return {
        ...state,
        videos: state.videos.map((video) => {
          if (video.id.videoId === action.videoId) {
            video.loading = false
          }
          return video;
        })
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

export const videosLoaded = (videoId) => ({
  type: VIDEOS_LOADED,
  videoId
});

export const formSubmitted = () => ({
  type: FORM_SUBMITTED
});

// == Selectors


// == Export
export default reducer;
