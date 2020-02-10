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
            key: '',
            maxResults: 50,
            // to only get < 4 min videos
            videoDuration: 'short',
            // type property is necessary when videoDuration property is used
            type: 'video',
            q: state.search
          }
        }
      )
      .then((response) => {
        const videoList = response.data.items;
  
        // to only keep video ids as a string
        const videosIds = videoList.map((video) => video.id.videoId).join();

        axios.get(
          'https://www.googleapis.com/youtube/v3/videos', 
          {
            params: {
              // another ajax call
              // to get more info on the videos caught
              // with the first ajax call.
              // Indeed, the exact duration of videos is needed:
              // only the videos that last a minimum of 3 minutes
              // should be kept
              key: '',
              part: 'contentDetails',
              id: videosIds
            }
          }
        )
        .then((response) => {
          // to only get three-minute videos
          const threeMinuteVideos = response.data.items.filter((video) => video.contentDetails.duration.includes('3M'));

          // we need three-minute videos
          // with the details provided by
          // the first ajax call response
          const threeMinuteVideosWithDetails = threeMinuteVideos.map((video) => 
            videoList.find((anyVideo) => {
              // adding duration property to each video
              // we keep, to have confirmation in the state 
              // that each video is indeed three minutes long
              anyVideo.duration = video.contentDetails.duration
              return anyVideo.id.videoId === video.id
            })
          );

          const videoAction = videosCaught(threeMinuteVideosWithDetails);

          // updating state with all three-minute videos
          store.dispatch(videoAction);
        })
        .catch((error) => console.log(error))
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
