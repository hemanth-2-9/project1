import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const ErrorScreen = () => {
  const navigate = useNavigate();

  const handleTryAgain = () => {
    // This will reload the entire application, useful for trying to re-fetch initial data
    window.location.reload();
  };

  const handleGoHome = () => {
    console.log("ErrorScreen: Attempting to navigate to the Home page.");
    navigate('/home', { replace: true });
  };

  return (
    <div className="flex h-screen bg-[#121212] font-montserrat">
      <Sidebar />
      {/* Main content area */}
      <div className="flex-1 flex flex-col text-white">
        
        {/* Back Button - Corrected structure */}
        <div className="p-4 sm:p-6 bg-transparent">
          <button
            onClick={handleGoHome} // <-- The onClick handler correctly placed on the button
            className="text-gray-300 hover:text-white transition-colors duration-200 text-lg font-semibold flex items-center bg-black bg-opacity-50 rounded-full px-4 py-2"
          >
            {/* SVG and text are directly inside the button */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Home {/* <-- Text is correctly inside the button */}
          </button>
        </div>

        {/* Error Content - Now centered below the back button */}
        <div className="flex-1 flex flex-col justify-center items-center p-4">
          <img
            src="https://res.cloudinary.com/dsyfrwb0s/image/upload/v1753336019/alert-triangle_1_kyya3s.png"
            alt="Error"
            className="w-24 h-24 mb-6"
          />
          <p className="text-xl font-semibold mb-4 text-center">
            Oops! Something went wrong.
          </p>
          <p className="text-gray-400 text-base text-center mb-8">
            We encountered an error loading the content. Please try again.
          </p>
          
          <button
            onClick={handleTryAgain}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full shadow-lg transition duration-300 ease-in-out"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorScreen;