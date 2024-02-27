import React, { useContext, useEffect } from 'react';
import VideoContext from '../context/VideoContext';
import VideosContext from '../context/VideosContext';
import Playlist from './Playlist';
import VideoSection from './VideoSection';

const Hero = () => {
  const { video, setVideo } = useContext(VideoContext);
  const { setVideos } = useContext(VideosContext);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_PUBLIC_URL}data.json`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else throw new Error('Error');
      })
      .then((data) => {
        setVideo(data.categories[0].videos[0]);
        setVideos(data.categories[0].videos);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className='grid grid-rows-12 h-screen'>
      {video.title && (
        <div className='grid grid-cols-7 items-center lg:items-end'>
          <div className='col-span-5'>
            <b className='text-2xl lg:text-5xl'>{video.title}</b>
          </div>
          <div className='col-span-2 hidden lg:flex'>
            <b className='text-4xl'>Browse movies...</b>
          </div>
        </div>
      )}
      <div className='row-span-11 grid grid-cols-7 align-middle'>
        <div className='col-span-7 lg:col-span-5 flex items-center pb-4 lg:pb-0'>
          <VideoSection />
        </div>
        <Playlist />
      </div>
    </div>
  );
};

export default Hero;
