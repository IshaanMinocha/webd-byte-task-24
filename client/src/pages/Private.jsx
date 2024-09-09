import React, { useState, useEffect, useRef } from 'react';

const Private = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const videoContainerRef = useRef(null);

  useEffect(() => {
    if (videoContainerRef.current.requestFullscreen) {
      videoContainerRef.current.requestFullscreen();
    } else if (videoContainerRef.current.mozRequestFullScreen) {
      videoContainerRef.current.mozRequestFullScreen();
    } else if (videoContainerRef.current.webkitRequestFullscreen) {
      videoContainerRef.current.webkitRequestFullscreen();
    } else if (videoContainerRef.current.msRequestFullscreen) {
      videoContainerRef.current.msRequestFullscreen();
    }

    const disableContextMenu = (e) => {
      e.preventDefault();
    };

    document.addEventListener('contextmenu', disableContextMenu);

    return () => {
      document.removeEventListener('contextmenu', disableContextMenu);
    };
  }, []);

  const handleCloseClick = () => {
    setIsFullscreen(true);
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  return (
    <div ref={videoContainerRef} className={`relative w-full ${isFullscreen ? 'h-screen' : 'h-screen'} bg-black`}>
      <video
        className="w-full h-full"
        src="/imp.mp4"
        autoPlay
        loop
        playsInline
        disablePictureInPicture
        controls={false}
      ></video>

      {!isFullscreen && (
        <div className="absolute bottom-0 w-full h-[10vh] bg-red-600 text-white flex justify-center items-center cursor-pointer" onClick={handleCloseClick}>
          <p className="text-lg font-semibold">close this</p>
        </div>
      )}

      {showMessage && (
        <div className="absolute inset-0 flex justify-center items-center bg-dark bg-opacity-75 text-light text-2xl font-bold">
          acha bilkul
        </div>
      )}
    </div>
  );
};

export default Private;