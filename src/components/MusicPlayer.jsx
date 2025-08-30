import React, { useEffect, useRef } from "react";

/**
 * A simple, persistent music player component.
 * It uses the HTML5 <audio> element to play music.
 *
 * @param {object} props - The component's props.
 * @param {string|null} props.nowPlayingUrl - The URL of the track to play.
 */
const MusicPlayer = ({ nowPlayingUrl }) => {
  const audioRef = useRef(null);

  // This effect hook listens for changes to the nowPlayingUrl.
  // When it changes, it updates the audio source and plays the new song.
  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement && nowPlayingUrl) {
      audioElement.src = nowPlayingUrl;
      audioElement
        .play()
        .catch((error) => console.error("Error playing audio:", error));
    }
  }, [nowPlayingUrl]);

  // If no song is playing, don't show the component.
  if (!nowPlayingUrl) {
    return null;
  }

  return (
    // This player is fixed to the bottom of the screen.
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-[#181818] border-t border-gray-700 flex items-center justify-center p-4 z-50">
      <audio
        ref={audioRef}
        controls // Provides default browser controls (play/pause, volume).
        className="w-full max-w-lg"
      >
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default MusicPlayer;
