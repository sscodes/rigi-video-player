import React, { useState } from 'react';
import VideoContext from './VideoContext';

const VideoContextProvider = ({ children }) => {
  const [video, setVideo] = useState({});
  return (
    <VideoContext.Provider value={{ video, setVideo }}>
      {children}
    </VideoContext.Provider>
  );
};

export default VideoContextProvider;
