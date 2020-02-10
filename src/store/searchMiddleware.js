import axios from 'axios';

import { FORM_SUBMITTED, videosCaught } from './reducer';

const searchMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FORM_SUBMITTED:
      const state = store.getState();

      axios.get(
        'https://www.googleapis.com/youtube/v3/search', 
        {
          params: {
            part: 'snippet',
            key: 'AIzaSyBf8v7IJjVLM9YLzIySEaBGnfl-hEBMvLM',
            maxResults: 10,
            // to only get < 4 min videos
            videoDuration: 'short',
            // type property is necessary when videoDuration property is used
            type: 'video',
            q: state.search
          }
        }
      )
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
      .finally(() => {
        // to let FORM_SUBMITTED go to the reducer
      // and make sure search state property is back to
      // being an empty string (to clear form after submission)
        next(action);
      })

      break;
    default:
      next(action);
  }
  next(action);
};

export default searchMiddleware;
