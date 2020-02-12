// REQUIRES

require('dotenv').config();
const express = require('express');
const cors = require('cors');
// using express-promiser-router
// to have exceptions managed
const Router = require('express-promise-router');
const router = new Router();
const axios = require('axios');

const app = express();


// MIDDLEWARES

app.use(cors({ origin: 'http://localhost:8080'}));
app.use(express.json());


// ROUTE

router.route('/getVideos/:search').get(async (req, res) => {
    const search = req.params.search;
    const API_KEY = process.env.API_KEY;

    const underFourMinuteVideosResponse = await axios.get(
        'https://www.googleapis.com/youtube/v3/search', 
        {
          params: {
            part: 'snippet',
            key: API_KEY,
            // limiting number of results
            // to avoid consuming too much
            maxResults: 15,
            // to only get < 4 min videos
            videoDuration: 'short',
            // type property is necessary when videoDuration property is used
            type: 'video',
            q: search
          }
        }
      )
      
    const underFourMinuteVideos = underFourMinuteVideosResponse.data.items;

    // to only keep video ids as a string
    const underFourMinuteVideosIds = underFourMinuteVideos.map((underFourMinuteVideo) => underFourMinuteVideo.id.videoId).join();

    const threeMinuteVideosResponse = await axios.get(
        'https://www.googleapis.com/youtube/v3/videos', 
        {
            params: {
                // another ajax call
                // to get more info on the videos caught
                // with the first ajax call.
                // Indeed, the exact duration of videos is needed:
                // only the videos that last a minimum of 3 minutes
                // should be kept
                key: API_KEY,
                part: 'contentDetails',
                id: underFourMinuteVideosIds
            }
        }
    )

    // to only get three-minute videos
    const threeMinuteVideos = threeMinuteVideosResponse.data.items.filter((threeMinuteVideo) => threeMinuteVideo.contentDetails.duration.includes('3M'));

    // we need three-minute videos
    // with the details provided by
    // the first ajax call response
    const threeMinuteVideosWithDetails = threeMinuteVideos.map((threeMinuteVideo) => 
        underFourMinuteVideos.find((underFourMinuteVideo) => {
            // adding duration property to each video
            // we keep, to have confirmation in the state 
            // that each video is indeed three minutes long
            underFourMinuteVideo.duration = threeMinuteVideo.contentDetails.duration
            return underFourMinuteVideo.id.videoId === threeMinuteVideo.id
        })
    );

    res.json(threeMinuteVideosWithDetails);
});

app.use('/videos', router);

// PORT

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})