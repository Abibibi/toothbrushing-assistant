import React, { useRef, useEffect } from 'react';

import './videos.sass';

const Videos = ({
  videos,
  currentSearch,
  videosReady,
  loading
}) => {
  const videoContainer = useRef(null);

  useEffect(() => {
    if (videos.length > 0) {
      // videos are supposed to be loaded at this point
      // so loaders need to be removed
      // calling videosReady method
      videosReady();

      const h2 = document.createElement('h2');
      h2.classList.add('videos-found-title');
      h2.textContent = `${videos.length} videos found for your search "${currentSearch}"`;
      videoContainer.current.appendChild(h2);

      videos.map((video) => {
        const iframe = document.createElement('iframe');
        iframe.classList.add("videos-found-video");
        // origin parameter protects against malicious third-party JavaScript
        // being injected into page
        // and hijacking control of YouTube player
        iframe.setAttribute('src', `http://www.youtube.com/embed/${video.id.videoId}?enablejsapi=1&origin=http://localhost:8080`);
        iframe.setAttribute('frameBorder', 0);
        iframe.setAttribute('allow', "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture");
        iframe.setAttribute('allowFullScreen', '');
        iframe.setAttribute('key', video.id.videoId);

        videoContainer.current.appendChild(iframe);
      })
    }
  });

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

  return (
    <div className="videos">
      {!videos.length && <div className="videos-free">
        <p className="videos-paragraph">Search and watch a 3-minute video while brushing your teeth</p>
      </div>}
      <div className="videos-free" ref={videoContainer}>
        {loading && videos.map(() => (
          <div className="videos-loader">
            <div className="videos-loader-content"></div>
          </div>
        ))}
      </div>
    </div>
  )
};

export default Videos;
