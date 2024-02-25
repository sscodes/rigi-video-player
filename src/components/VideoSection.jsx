import React, { useEffect, useRef, useState } from 'react';
import { FaCirclePlay } from 'react-icons/fa6';
import { FaPauseCircle } from 'react-icons/fa';
import { BiFullscreen } from 'react-icons/bi';
import { BiExitFullscreen } from 'react-icons/bi';

const VideoSection = ({ video }) => {
  const [progress, setProgress] = useState(50);
  const [paused, setPaused] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(null);
  const [fullScreenMouseMove, setFullScreenMouseMove] = useState('initial');
  const [playbackRate, setPlaybackRate] = useState(1);

  const videoRef = useRef(null);

  const pauseVideo = () => {
    setPaused(true);
    videoRef.current.pause();
  };

  const playVideo = () => {
    setPaused(false);
    videoRef.current.play();
  };

  const toggleFullScreen = () => {
    const videoContainer = document.querySelector('.video-container');
    if (document.fullscreenElement == null) {
      setFullScreen(true);
      videoContainer.requestFullscreen();
    } else {
      setFullScreen(false);
      document.exitFullscreen();
    }
  };

  const setFullTime = (time) => {
    let hours =
      time / (60 * 60) > 0 &&
      (Math.floor(time / (60 * 60)).toString().length === 1
        ? '0' + Math.floor(time / (60 * 60))
        : Math.floor(time / (60 * 60)).toString());
    let minutes =
      Math.floor(time / 60).toString().length === 1
        ? '0' + Math.floor(time / 60)
        : Math.floor(time / 60).toString();
    let seconds =
      Math.floor(time % 60).toString().length === 1
        ? '0' + Math.floor(time % 60)
        : Math.floor(time % 60).toString();
    return `${hours ? hours : '00'}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef?.current) {
        setProgress(
          (100 * videoRef?.current?.currentTime) / videoRef?.current?.duration
        );
        setCurrentTime(setFullTime(videoRef?.current?.currentTime));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef?.current) {
        setProgress(
          (100 * videoRef?.current?.currentTime) / videoRef?.current?.duration
        );
      }
    }, 0.1);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (fullScreen) setFullScreenMouseMove('hide');
    }, 4000);

    return () => clearTimeout(timeout);
  }, [fullScreenMouseMove]);

  useEffect(() => {
    if (!fullScreen) setFullScreenMouseMove('initial');
  }, [fullScreen]);

  const changeSpeed = () => {
    if (videoRef?.current) {
      videoRef.current.playbackRate += 0.25;
      setPlaybackRate(playbackRate + 0.25);
      if (videoRef.current.playbackRate > 2) {
        setPlaybackRate(0.25);
        videoRef.current.playbackRate = 0.25;
      }
    }
  };

  const handleSeek = (e) => {
    const totalWidth = e.target.getBoundingClientRect().width;
    const width = e.clientX - e.target.getBoundingClientRect().left;
    const seekPercent = Math.round((width / totalWidth) * 100);
    setProgress(seekPercent);
    videoRef.current.currentTime =
      Math.round(videoRef.current.duration * (seekPercent / 100) * 1000000) /
      1000000;
  };

  return (
    <div
      className={`video-container relative cursor-pointer ${
        paused && 'paused'
      } ${fullScreen && 'full-screen'}`}
      onMouseMove={() => {
        if (fullScreen) setFullScreenMouseMove('show');
      }}
    >
      {video?.title && (
        <>
          <div
            className={`full-screen-button-section ${
              fullScreenMouseMove === 'hide' && 'hidden'
            } absolute top-4 right-4 opacity-0 transition-opacity duration-700 ease-in-out`}
          >
            {fullScreen ? (
              <button
                className='text-white text-3xl'
                onClick={toggleFullScreen}
              >
                <BiExitFullscreen />
              </button>
            ) : (
              <button
                className='text-white text-3xl'
                onClick={toggleFullScreen}
              >
                <BiFullscreen />
              </button>
            )}
          </div>
          <div
            className={`timer-section ${
              fullScreenMouseMove === 'hide' && 'hidden'
            } absolute bottom-7 left-4 text-white opacity-0 transition-opacity duration-700 ease-in-out`}
          >
            {videoRef?.current && currentTime}
          </div>
          <div
            className={`video-controls-container  ${
              fullScreenMouseMove === 'hide' && 'hidden'
            } absolute bottom-0 opacity-0 transition-opacity duration-700 ease-in-out`}
          >
            <div className='timeline-container absolute h-2 w-full flex justify-center cursor-pointer'>
              <div style={{ maxWidth: '100%', width: '100vw' }}>
                <div
                  className='timeline w-full relative h-2 top-0 rounded-lg'
                  onClick={handleSeek}
                ></div>
                <div
                  className='absolute bg-blue-700 h-2 top-0 rounded-lg pointer-events-none'
                  style={{ maxWidth: '100%', width: `${progress}%` }}
                ></div>
              </div>
            </div>
            <div className='control-buttons absolute left-1/2 bottom-2 grid grid-cols-2 items-center gap-2'>
              <div className='play-pause-button opacity-70 hover:opacity-100 transition-opacity duration-300 ease-in-out'>
                {paused ? (
                  <button className='text-white text-5xl' onClick={playVideo}>
                    <FaCirclePlay />
                  </button>
                ) : (
                  <button className='text-white text-5xl' onClick={pauseVideo}>
                    <FaPauseCircle />
                  </button>
                )}
              </div>
              <div
                onClick={changeSpeed}
                className='speed-section w-16 text-xl text-black text-center rounded-xl mb-1 bg-white opacity-70 hover:opacity-100 transition-opacity duration-300 ease-in-out'
              >
                {playbackRate}x
              </div>
            </div>
          </div>
          <div
            className={`timer-section ${
              fullScreenMouseMove === 'hide' && 'hidden'
            } absolute bottom-7 right-4 text-white opacity-0 transition-opacity duration-700 ease-in-out`}
          >
            {videoRef?.current && setFullTime(videoRef?.current?.duration)}
          </div>
          {/* TODO: implement play pause Icon */}
          {/* <div className='opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out'>
            {paused ? (
              <button className='text-white text-4xl' onClick={playVideo}>
                <FaCirclePlay />
              </button>
            ) : (
              <button className='text-white text-4xl' onClick={pauseVideo}>
                <FaPauseCircle />
              </button>
            )}
          </div> */}
          <video
            id='video'
            onClick={paused ? () => playVideo() : () => pauseVideo()}
            ref={videoRef}
            className='video rounded-2xl'
          >
            <source src={video.path} type='video/mp4' />
          </video>
        </>
      )}
      <div></div>
    </div>
  );
};

export default VideoSection;
