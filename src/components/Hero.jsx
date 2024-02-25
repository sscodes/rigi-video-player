import React, { useContext, useEffect, useState } from 'react';
import VideoSection from './VideoSection';
import Header from './Header';
import Playlist from './Playlist';
import VideoContext from '../context/VideoContext';
import VideosContext from '../context/VideosContext';

const Hero = () => {
  const { setVideo } = useContext(VideoContext);
  const { setVideos } = useContext(VideosContext);

  useEffect(() => {
    fetch('../../data.json')
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
      <Header />
      <div className='row-span-10 grid grid-cols-7 align-middle'>
        <div className='col-span-7 lg:col-span-5 flex items-center'>
          <VideoSection />
        </div>
        <Playlist />
      </div>
      <Header />
    </div>
  );
};

export default Hero;
