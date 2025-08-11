import React, { useState } from "react";
import { Link } from 'react-router-dom'; // Import Link

function Sidebar() {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleSidebar = () => {
    setIsMinimized(prev => !prev);
  };

  return (
    <div
      className={`flex flex-col justify-between h-screen bg-[#181818] text-white shadow-xl transition-all duration-300 ease-in-out
      ${isMinimized ? 'w-20 px-2' : 'w-64 p-4'}`}
    >
      {/* Top Section: Logo/App Icon and Hamburger Toggle */}
      <div className="flex flex-col items-center">
        {/* Conditional Logo/App Icon */}
        {isMinimized ? (
          <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center my-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            <path d="M320 72C183 72 72 183 72 320C72 457 183 568 320 568C457 568 568 457 568 320C568 183 457 72 320 72zM420.7 436.9C416.5 436.9 413.9 435.6 410 433.3C347.6 395.7 275 394.1 203.3 408.8C199.4 409.8 194.3 411.4 191.4 411.4C181.7 411.4 175.6 403.7 175.6 395.6C175.6 385.3 181.7 380.4 189.2 378.8C271.1 360.7 354.8 362.3 426.2 405C432.3 408.9 435.9 412.4 435.9 421.5C435.9 430.6 428.8 436.9 420.7 436.9zM447.6 371.3C442.4 371.3 438.9 369 435.3 367.1C372.8 330.1 279.6 315.2 196.7 337.7C191.9 339 189.3 340.3 184.8 340.3C174.1 340.3 165.4 331.6 165.4 320.9C165.4 310.2 170.6 303.1 180.9 300.2C208.7 292.4 237.1 286.6 278.7 286.6C343.6 286.6 406.3 302.7 455.7 332.1C463.8 336.9 467 343.1 467 351.8C466.9 362.6 458.5 371.3 447.6 371.3zM478.6 295.1C473.4 295.1 470.2 293.8 465.7 291.2C394.5 248.7 267.2 238.5 184.8 261.5C181.2 262.5 176.7 264.1 171.9 264.1C158.7 264.1 148.6 253.8 148.6 240.5C148.6 226.9 157 219.2 166 216.6C201.2 206.3 240.6 201.4 283.5 201.4C356.5 201.4 433 216.6 488.9 249.2C496.7 253.7 501.8 259.9 501.8 271.8C501.8 285.4 490.8 295.1 478.6 295.1z"/></svg>
          </div>
        ) : (
          <img
            className="w-32 h-auto mx-auto mb-8"
            src="https://res.cloudinary.com/dsyfrwb0s/image/upload/v1752050317/music_wd4cav.png"
            alt="Spotify Logo"
          />
        )}

        {/* Hamburger/Collapse Toggle Button */}
        <button
          onClick={toggleSidebar}
          className={`text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-md mb-8
          ${isMinimized ? 'mx-auto' : 'self-end mr-0'}`}
        >
          {isMinimized ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          )}
        </button>

        {/* Navigation Section */}
        <nav className="space-y-4 w-full">
          {/* Home Link */}
          <Link
            to="/home" // Use Link to for navigation
            className="flex items-center text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-md"
          >
            <svg className={`size-6 ${isMinimized ? 'mx-auto' : 'mr-4'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 0 01-1 1h-3m-6 0a1 1 0 001 1h3v-3m-3 3h-3a1 1 0 01-1-1v-4m9 11v-4h-3c-.667 0-1.333-.333-2-1"></path>
            </svg>
            <span className={`font-montserrat text-sm font-semibold ${isMinimized ? 'hidden' : 'block'}`}>Home</span>
          </Link>

          {/* Your Library Link - UPDATED TO LINK TO /my-library */}
          <Link
            to="/library" // Navigate to the new My Library page
            className="flex items-center text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-md"
          >
            <svg className={`size-6 ${isMinimized ? 'mx-auto' : 'mr-4'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
            <span className={`font-montserrat text-sm font-semibold ${isMinimized ? 'hidden' : 'block'}`}>Your Library</span>
          </Link>

          {/* Get Premium Link */}
          <Link
            to="/premium" // Use Link to for navigation
            className="flex items-center text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-md"
          >
            <svg className={`size-6 ${isMinimized ? 'mx-auto' : 'mr-4'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
            </svg>
            <span className={`font-montserrat text-sm font-semibold ${isMinimized ? 'hidden' : 'block'}`}>Get Premium</span>
          </Link>
        </nav>
      </div>

      {/* Bottom Section: Logout */}
      <div className="mt-auto w-full">
        <Link
          to="/login"
          className="flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-200 py-2 rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`size-6 ${isMinimized ? 'mx-auto' : 'mr-2'}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
            />
          </svg>
          <span className={`text-sm font-semibold font-montserrat ${isMinimized ? 'hidden' : 'block'}`}>Logout</span>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;