import React, { useRef, useEffect } from 'react';
import classNames from 'classnames';

import './videos.sass';

const Videos = ({
  videos,
  currentSearch,
  videosReady,
  loading
}) => {
  const videoContainer = useRef(null);
  /* const allVideos = () => {
    return (
      <div>
        <h2 className="videos-found-title">{videos.length} videos found for your search "{currentSearch}"</h2>
          {videos.map((video) =>
            <iframe
              className="videos-found-video"
              // origin parameter protects against malicious third-party JavaScript
              // being injected into page
              // and hijacking control of YouTube player
              src={`http://www.youtube.com/embed/${video.id.videoId}?enablejsapi=1&origin=http://localhost:8080`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              key={video.id.videoId}
            />
          )}
      </div>
    )
  }; */

  const videoFullyLoaded = () => {
    console.log(videoContainer)
  }

  const videoClass = classNames({
    "videos-found-hide": loading,
    "videos-found-video": !loading
  });

  return (
    <div className="videos">
      {!videos.length && <div className="videos-free">
        <p className="videos-paragraph">Search and watch a 3-minute video while brushing your teeth</p>
      </div>}
      {videos.length > 0 && <h2 className="videos-found-title">{videos.length} videos found for your search "{currentSearch}"</h2>}
      <div className="videos-free">
        {loading && videos.map(({ id: { videoId } }) => (
            <div key={videoId} className="videos-loader videos-found-video">
              <div className="videos-loader-content"></div>
            </div>
          )
        )}
        {videos.map(({ id: { videoId } }) => (
            <iframe
              className={videoClass}
              // origin parameter protects against malicious third-party JavaScript
              // being injected into page
              // and hijacking control of YouTube player
              src={`http://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=http://localhost:8080`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={videosReady}
              key={videoId}
              ref={videoContainer}
            />
          )
        )}
      </div>
    </div>
  )
};

export default Videos;
