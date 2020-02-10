import React from 'react';

import './videos.sass';

const Videos = ({ videos }) => {

  return (
    <div className="videos">
      {videos.length===0 && <div className="videos-free">
        Having a hard time brushing your teeth for 3 minutes?
        Type in whatever you enjoy and watch a relevant Youtube video that exactly lasts 3 minutes.
        Time always flies when you're having a good time :)
      </div>}
    </div>
  )
};

export default Videos;
