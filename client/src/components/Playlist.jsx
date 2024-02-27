import React, { useContext, useRef } from 'react';
import { MdOutlineDragIndicator } from 'react-icons/md';
import VideoContext from '../context/VideoContext';
import VideosContext from '../context/VideosContext';

const Playlist = () => {
  const { videos, setVideos } = useContext(VideosContext);
  const { setVideo } = useContext(VideoContext);

  let dragItem = useRef(null).current;
  let dragEnterItem = useRef(null).current;

  const handleReorder = () => {
    let _videos = [...videos];

    const dragElement = _videos.splice(dragItem, 1);
    const before = _videos.slice(0, dragEnterItem);
    const after = _videos.slice(dragEnterItem);

    setVideos([...before, ...dragElement, ...after]);
    dragItem = null;
    dragEnterItem = null;
  };

  return (
    <div className='playlist-container overflow-y-scroll col-span-7 lg:col-span-2'>
      <div className='grid grid-cols-1 p-4 gap-2 relative mb-10'>
        {videos.length > 0 &&
          videos.map((video, index) => {
            return (
              <div
                key={index}
                className='cursor-move grid py-4 grid-cols-12 hover:border-t-2 hover:border-b-2 hover:border-white'
                draggable
                onDragStart={() => (dragItem = index)}
                onDragEnter={() => (dragEnterItem = index)}
                onDragEnd={handleReorder}
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
