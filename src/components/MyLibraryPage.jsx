import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Loading from './Loading';

// Helper functions (add these, they are fine)
function formatDuration(ms) {
 const minutes = Math.floor(ms / 60000);
 const seconds = Math.floor(((ms % 60000) / 1000));
 return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function formatAddedDate(dateString) {
 if (!dateString) return "—";
 const now = new Date();
 const addedDate = new Date(dateString);
 const diffMs = now - addedDate;
 const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
 if (diffDays < 1) return "Today";
 if (diffDays === 1) return "1 day ago";
 if (diffDays < 7) return `${diffDays} days ago`;
 if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
 
 const diffMonths = Math.floor(diffDays / 30);
 if (diffMonths === 1) return "1 month ago";
 if (diffMonths < 12) return `${diffMonths} months ago`;
 const diffYears = Math.floor(diffDays / 365);
 return diffYears === 1 ? "1 year ago" : `${diffYears} years ago`;
}


function MyLibraryPage({ likedTracks, setLikedTracks, setNowPlaying }) { 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [displayTracks, setDisplayTracks] = useState([]);

  useEffect(() => {
    const tracksArray = Object.values(likedTracks);
    setDisplayTracks(tracksArray);
    setLoading(false);
  }, [likedTracks]);

  const handleGoBack = () => {
    navigate('/', { replace: true });
  };

  const handleToggleLikeTrack = (e, track) => {
    e.stopPropagation();

    if (track.preview_url) {
      setNowPlaying(track.preview_url);
    } else {
      console.warn(`No preview URL found for "${track.name}".`);
      // Optional: Give a visual pop-up to the user
    }

    setLikedTracks(prevLikedTracks => {
      const isCurrentlyLiked = !!prevLikedTracks[track.id];
      const newLikedTracks = { ...prevLikedTracks };

      if (isCurrentlyLiked) {
        delete newLikedTracks[track.id];
      } else {
        newLikedTracks[track.id] = track;
      }
      return newLikedTracks;
    });
  };
  
  // This is the handler for playing a track by clicking the table row
  const handlePlayTrack = (track) => {
    if (track.preview_url) {
      setNowPlaying(track.preview_url);
    } else {
      console.warn(`No preview URL found for "${track.name}".`);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex h-screen bg-[#121212] font-montserrat text-white">
      <Sidebar />
      <div className="flex-1 overflow-y-auto p-8 lg:p-10 pb-20">
        {/* Back Button */}
        <div className="p-0 sm:p-0 bg-transparent mb-6">
          <button
            onClick={handleGoBack}
            className="text-gray-300 hover:text-white transition-colors duration-200 text-lg font-semibold flex items-center bg-black bg-opacity-50 rounded-full px-4 py-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Home
          </button>
        </div>

        {/* Page Title */}
        <h1 className="text-4xl lg:text-5xl font-bold mb-10 text-center lg:text-left">
          My Liked Songs
        </h1>

        {displayTracks.length === 0 ? (
          <p className="text-gray-400 text-center text-lg mt-10">
            You haven't liked any songs yet. Like some songs to add them here!
          </p>
        ) : (
          <table className="w-full mt-6 text-sm text-left table-auto">
            <thead className="text-gray-400 border-b border-gray-700 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4 w-12">#</th>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4 hidden md:table-cell">Album</th>
                <th className="py-3 px-4 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 mx-auto">
                    <path d="M11.645 20.917 3.033 12.25a2.25 2.25 0 0 1 0-3.182l.836-.836c.582-.582 1.57-.582 2.152 0l1.458 1.459c.287.287.72.338 1.05.127l.95-.609c.783-.5 1.72-.5 2.503 0l.95.609c.33.211.763.16.1.05l1.458-1.459c.582-.582 1.57-.582 2.152 0l.836.836a2.25 2.25 0 0 1 0 3.182l-8.612 8.667a.75.75 0 0 1-1.08 0Z" />
                  </svg>
                </th>
                <th className="py-3 px-4 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mx-auto">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </th>
              </tr>
            </thead>
            <tbody>
              {displayTracks.map((track, index) => (
                <tr
                  key={track.id}
                  className="text-gray-300 border-b border-gray-800 hover:bg-[#282828] transition-colors duration-200 cursor-pointer group"
                  // Call the new handlePlayTrack function on row click
                  onClick={() => handlePlayTrack(track)}
                >
                  <td className="py-3 px-4 w-12">{index + 1}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      {track.album?.images?.[0]?.url && (
                         <img src={track.album.images[0].url} alt={track.name} className="w-10 h-10 rounded-md mr-4 object-cover"/>
                      )}
                      <div className="flex flex-col">
                         <span className="text-white font-semibold truncate max-w-xs">
                           {track.name}
                         </span>
                         <span className="text-gray-400 text-xs">
                           {track.artists.map((a) => a.name).join(", ")}
                         </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell truncate max-w-xs">
                    {track.album?.name || "—"}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={(e) => handleToggleLikeTrack(e, track)}
                      className="focus:outline-none text-green-500 opacity-100"
                      aria-label="Unlike song"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                        <path d="M11.645 20.917 3.033 12.25a2.25 2.25 0 0 1 0-3.182l.836-.836c.582-.582 1.57-.582 2.152 0l1.458 1.459c.287.287.72.338 1.05.127l.95-.609c.783-.5 1.72-.5 2.503 0l.95.609c.33.211.763.16.1.05l1.458-1.459c.582-.582 1.57-.582 2.152 0l.836.836a2.25 2.25 0 0 1 0 3.182l-8.612 8.667a.75.75 0 0 1-1.08 0Z" />
                      </svg>
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    {formatDuration(track.duration_ms)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default MyLibraryPage;