import React, { useState } from 'react';
import VideosContext from './VideosContext';

const VideosContextProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  return (
    <VideosContext.Provider value={{ videos, setVideos }}>
      {children}
    </VideosContext.Provider>
  );
};

export default VideosContextProvider;
