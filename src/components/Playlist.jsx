import React, { useContext } from 'react';
import VideoContext from '../context/VideoContext';
import VideosContext from '../context/VideosContext';
import { MdOutlineDragIndicator } from "react-icons/md";

const Playlist = () => {
  const { videos } = useContext(VideosContext);
  const { setVideo } = useContext(VideoContext);

  return (
    <div className='playlist-container overflow-y-scroll col-span-7 lg:col-span-2'>
      <div className='grid grid-cols-1 p-4 gap-2 relative mb-10'>
        <h1 className='text-4xl bg-neutral-900'>
          <b>Browse movies...</b>
        </h1>

        {videos.length > 0 &&
          videos.map((video) => {
            return (
              <div
                key={video.title}
                className='cursor-pointer grid grid-cols-12'
              >
                <div className='col-span-2 text-white text-3xl flex items-center'>
                  <MdOutlineDragIndicator />
                </div>
                <div className='col-span-10 flex justify-end'>
                  <div className='w-96 hover:w-full transition-all duration-200 ease-in-out flex justify-end'>
                    <img
                      src={video.thumb}
                      className='rounded-2xl border-4 border-white'
                      alt='thumbnail'
                      onClick={() => setVideo(video)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Playlist;
