import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import VideoContextProvider from './context/VideoContextProvider.jsx';
import './index.css';
import VideosContextProvider from './context/VideosContextProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <VideosContextProvider>
    <VideoContextProvider>
      <App />
    </VideoContextProvider>
  </VideosContextProvider>
);
