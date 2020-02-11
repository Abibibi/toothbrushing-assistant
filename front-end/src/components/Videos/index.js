import React from 'react';

import './videos.sass';

const Videos = ({ videos }) => {

  return (
    <div className="videos">
      {videos.length === 0 && <div className="videos-free">
        <p className="videos-paragraph">Search and watch a 3-minute video while brushing your teeth</p>
      </div>}
    </div>
  )
};

export default Videos;
