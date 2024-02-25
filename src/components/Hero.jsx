import React, { useEffect, useState } from 'react';
import VideoSection from './VideoSection';
import Header from './Header';
import Playlist from './Playlist';

const Hero = () => {
  const [videos, setVideos] = useState([]);
  const [video, setVideo] = useState({});

  useEffect(() => {
    fetch('../../data.json')
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else throw new Error('Error');
      })
      .then((data) => {
        setVideo(data.videos[0]);
        setVideos(data.videos);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log(video);
  }, [video]);

  return (
    <div className='grid grid-rows-12 h-screen'>
      <Header />
      <div className='row-span-10 grid grid-cols-7 align-middle'>
        <div className='col-span-7 lg:col-span-5 flex items-center'>
          <VideoSection video={video} />
        </div>
        <Playlist videos={videos} setVideo={setVideo} />
      </div>
      <Header />
    </div>
  );
};

export default Hero;
