import React from 'react';
import { FaShuffle } from 'react-icons/fa6';

const Playlist = ({ videos, setVideo }) => {
  const shufflePlaylist = () => {};

  return (
    <div className='playlist-container overflow-y-scroll col-span-7 lg:col-span-2'>
      <div className='grid grid-cols-1 p-4 gap-2 relative mb-10'>
        <div className='grid grid-cols-12 items-center sticky top-0 h-10 bg-neutral-900 '>
          <h1 className='text-4xl bg-neutral-900 col-span-11'>
            <b>Browse movies...</b>
          </h1>
          <div
            className='text-2xl bg-neutral-900 cursor-pointer'
            onClick={shufflePlaylist}
          >
            <FaShuffle />
          </div>
        </div>

        {videos.length > 0 &&
          videos.map((video) => {
            return (
              <div key={video.id} className='cursor-pointer flex justify-end'>
                <img
                  src={video.thumbnail}
                  className='thumbnail w-96 rounded-2xl border-4 border-white'
                  alt='thumbnail'
                  onClick={() => setVideo(video)}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Playlist;
