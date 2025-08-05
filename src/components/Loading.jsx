import React, { useState, useEffect } from "react"; // Import useState and useEffect

function Loading() {
  const [seconds, setSeconds] = useState(3); // Start countdown from 3 seconds (or whatever you like)

  useEffect(() => {
    // This effect runs once when the component mounts
    const timer = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds <= 1) {
          clearInterval(timer); // Stop the timer when it reaches 0
          return 0; // Or whatever final state you want, though parent usually unmounts it
        }
        return prevSeconds - 1;
      });
    }, 1000); // Update every 1 second (1000 ms)

    // Cleanup function: important to clear the interval when the component unmounts
    // to prevent memory leaks and unnecessary state updates on unmounted components.
    return () => clearInterval(timer);
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black">
      <div className="flex flex-col items-center">
        <img
          src="https://res.cloudinary.com/dsyfrwb0s/image/upload/v1752050317/music_wd4cav.png"
          alt="Loading..."
          className="w-32 h-32 mb-8 animate-bounce"
        />
        <p className="text-4xl text-white font-bold tracking-wide font-montserrat animate-pulse">
          Loading...  {/* Display countdown if seconds > 0 */}
        </p>
      </div>
    </div>
  );
}

export default Loading;