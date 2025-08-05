import React, { useEffect, useRef } from 'react';

function AudioPlayer({ nowPlayingUrl }) {
    const audioRef = useRef(null);

    useEffect(() => {
        if (nowPlayingUrl && audioRef.current) {
            audioRef.current.src = nowPlayingUrl;
            audioRef.current.play();
        }
    }, [nowPlayingUrl]);

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-[#282828] text-white p-4">
            <audio ref={audioRef} controls autoPlay className="w-full">
                Your browser does not support the audio element.
            </audio>
        </div>
    );
}

export default AudioPlayer;