import axios from 'axios';

import { FORM_SUBMITTED, videosCaught } from './reducer';

const searchMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FORM_SUBMITTED:
      const state = store.getState();

      axios.get(`http://localhost:5000/videos/getVideos/${state.search}`)
      .then((response) => {
        console.log(response)
        
        const videoAction = videosCaught(response.data);
        
        store.dispatch(videoAction);
      })
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
