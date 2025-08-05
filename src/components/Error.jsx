import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

function Error() {
  const navigate = useNavigate();

  const handleTryAgain = () => {
    // For a 404, "Try Again" might imply reloading the non-existent page.
    // A better "Try Again" for a 404 might be to go home, or explicitly reload if there was a network glitch.
    // Sticking to reload for now as per previous code, but consider if this is ideal for a 404.
    window.location.reload(); 
  };

  const handleGoHome = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className="flex h-screen bg-[#121212] font-montserrat">
      <Sidebar />
      <div className="flex-1 flex flex-col text-white">
        
        {/* Back Button - Positioned at the very top, consistent with AlbumPage */}
        <div className="p-4 sm:p-6 bg-transparent">
          <button
            onClick={handleGoHome}
            className="text-gray-300 hover:text-white transition-colors duration-200 text-lg font-semibold flex items-center bg-black bg-opacity-50 rounded-full px-4 py-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Home
          </button>
        </div>

        {/* Error Content - Centered for the 404 message */}
        <div className="flex-1 flex flex-col justify-center items-center p-4">
          <img
            src="https://res.cloudinary.com/dsyfrwb0s/image/upload/v1752312675/Frame_154_d0ujzg.png" // <-- Reverted to your specified image
            alt="Page Not Found" // Updated alt text
            className="w-40 h-auto mb-6" // Adjusting size as this image seems wider
          />
          <p className="text-xl font-semibold mb-4 text-center">
            404 - Page Not Found
          </p>
          <p className="text-gray-400 text-base text-center mb-8 max-w-md"> {/* Added max-w-md for narrower text block */}
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          
          <button
            onClick={handleTryAgain} // Keeping 'Try Again' which will reload the same 404 page
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full shadow-lg transition duration-300 ease-in-out"
          >
            Try Again
          </button>
          {/* Note: For a 404, often "Try Again" is replaced with "Go to Home" or omitted, as reloading a non-existent page isn't helpful. */}
          {/* However, keeping it as per your request. */}
        </div>
      </div>
    </div>
  );
}

export default Error;