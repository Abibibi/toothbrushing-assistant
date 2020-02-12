import React from 'react';
import classNames from 'classnames';

import './videos.sass';

const Videos = ({
  videos,
  currentSearch,
  videosReady
}) => {
  return (
    <div className="videos">
      {!videos.length && <div className="videos-free">
        <p className="videos-paragraph">Search and watch a 3-minute video while brushing your teeth</p>
      </div>}
      {videos.length > 0 && <h2 className="videos-found-title">{videos.length} {videos.length > 1 ? 'videos': 'video'} found for your search "{currentSearch}"</h2>}
      <div className="videos-free">
        {videos.map(({ id: { videoId }, loading }) => (
            <iframe
              className={loading ? "videos-found-hide" : "videos-found-video"}
              // origin parameter protects against malicious third-party JavaScript
              // being injected into page
              // and hijacking control of YouTube player
              src={`http://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=http://localhost:8080`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={() => { videosReady(videoId); console.log('video ready'); }}
              key={videoId}
            />
          )
        )}
        {videos.map(({ id: { videoId }, loading }) => {
          if (loading) {
            return (
              <div key={videoId} className="videos-loader videos-found-video">
                <div className="videos-loader-content"></div>
              </div>
            )
          }
        })}
      </div>
    </div>
  )
};

export default Videos;
