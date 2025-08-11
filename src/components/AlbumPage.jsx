import React, { useEffect, useState } from "react";
import Loading from "./Loading"; 

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

function AlbumPage({ albumData, setShowAlbumPage, setNowPlaying, likedTracks, setLikedTracks }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (albumData) {
      setLoading(false);

    } else {
      setLoading(true);
    }
  }, [albumData]); 

  if (loading) {
    return <Loading />;
  }

  if (!albumData) {
    return (
      <div className="bg-[#121212] min-h-screen text-white flex items-center justify-center">
        <p className="text-xl">No album data available.</p>
      </div>
    );
  }

  const imageUrl = albumData.images?.[0]?.url || albumData.album?.images?.[0]?.url;
  const albumName = albumData.name;
  const ownerName = albumData.owner?.display_name || albumData.artists?.[0]?.name || 'Various Artists';
  const totalTracks = albumData.tracks?.total || albumData.total_tracks;

const handleToggleLikeTrack = (e, track) => {
  e.stopPropagation();

  if (track.preview_url) {
    setNowPlaying(track.preview_url);
    console.log(`Now playing: "${track.name}"`);
  } else {
    console.warn(`No preview URL found for "${track.name}".`);
  }

  setLikedTracks(prevLikedTracks => {
    const isCurrentlyLiked = !!prevLikedTracks[track.id];
    const newLikedTracks = { ...prevLikedTracks };

    if (isCurrentlyLiked) {
      delete newLikedTracks[track.id];
      console.log(`Unliking track: "${track.name}" (ID: ${track.id})`);
    } else {
      newLikedTracks[track.id] = track;
      console.log(`Liking track: "${track.name}" (ID: ${track.id})`);
    }
    return newLikedTracks;
  });
};


  return (
    <div className="flex-1 bg-gradient-to-b from-[#1A1A1A] to-[#121212] min-h-screen text-white font-montserrat overflow-y-auto">
      <div className="p-4 sm:p-6 bg-transparent">
        <button
          onClick={() => setShowAlbumPage(false)}
          className="text-gray-300 hover:text-white transition-colors duration-200 text-lg font-semibold flex items-center bg-black bg-opacity-50 rounded-full px-4 py-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-5 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back
        </button>
      </div>

      {/* Header Section */}
      <div className="p-8 lg:p-10 pb-4 flex flex-col sm:flex-row items-center sm:items-end gap-6">
        {/* Album Cover */}
        <img
          src={imageUrl}
          className="w-48 h-48 sm:w-60 sm:h-60 rounded-lg shadow-2xl"
          alt={albumName}
        />

        {/* Album Details */}
        <div className="text-center sm:text-left z-10">
          <p className="text-gray-300 text-sm mb-2 uppercase font-bold tracking-wider">
            {albumData.type === 'album' ? 'Album' : 'Playlist'}
          </p>
          <h1 className="text-5xl lg:text-7xl font-bold mb-3 leading-tight">{albumName}</h1>
          <p className="text-gray-300 text-base">{ownerName}</p>
          <p className="text-gray-400 text-sm mt-1">
            {totalTracks} {totalTracks === 1 ? 'song' : 'songs'}
          </p>
        </div>
      </div>

      {/* Action Buttons (Play) */}
      <div className="p-8 lg:px-10 flex items-center gap-6">
        <button
          onClick={() => setNowPlaying(albumData.tracks.items[0]?.track?.name || albumName)}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition duration-300 ease-in-out flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
            <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.53 0 3.243L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Tracks Table */}
      <table className="w-full mt-6 text-sm text-left table-auto px-8 lg:px-10 pb-10">
        {/* Table Head */}
        <thead className="text-gray-400 border-b border-gray-700 uppercase tracking-wider">
          <tr>
            <th className="py-3 px-4 w-12">#</th>
            <th className="py-3 px-4">Title</th>
            <th className="py-3 px-4 hidden md:table-cell">Album</th>
            <th className="py-3 px-4 hidden sm:table-cell">Date Added</th>
            <th className="py-3 px-4 text-center">
              {/* Heart icon for Likes in header, small size */}
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
        {/* Table Body */}
        <tbody>
          {albumData.tracks.items.map((item, index) => {
            const track = item.track || item;
            if (!track || !track.id) return null;

            // Determine if the track is liked based on the global likedTracks prop
            const isLiked = !!likedTracks[track.id]; 

            return (
              <tr
                key={track.id}
                className="text-gray-300 border-b border-gray-800 hover:bg-[#282828] transition-colors duration-200 cursor-pointer group"
                onClick={() => setNowPlaying(track.name)}
              >
                <td className="py-3 px-4 w-12 group-hover:text-green-500">{index + 1}</td>
                <td className="py-3 px-4">
                  <div className="flex flex-col">
                    <span className="text-white font-semibold truncate max-w-xs group-hover:text-green-500">
                      {track.name}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {track.artists.map((a) => a.name).join(", ")}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 hidden md:table-cell truncate max-w-xs">
                  {track.album?.name || "—"}
                </td>
                <td className="py-3 px-4 hidden sm:table-cell">
                  {item.added_at ? formatAddedDate(item.added_at) : "—"}
                </td>
                
                {/* Like/Add to Library Column */}
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={(e) => handleToggleLikeTrack(e, track)} // Pass the full track object
                    className={`focus:outline-none transition-opacity duration-200 ${
                      isLiked 
                        ? 'text-green-500 opacity-100' // Always visible and green if liked
                        : 'text-gray-400 opacity-0 group-hover:opacity-100' // Hidden by default, visible on row hover
                    }`}
                    aria-label={isLiked ? "Unlike song" : "Like song"}
                  >
                    {/* Conditional rendering of solid vs. outline heart */}
                    {isLiked ? (
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                         <path d="M11.645 20.917 3.033 12.25a2.25 2.25 0 0 1 0-3.182l.836-.836c.582-.582 1.57-.582 2.152 0l1.458 1.459c.287.287.72.338 1.05.127l.95-.609c.783-.5 1.72-.5 2.503 0l.95.609c.33.211.763.16.1.05l1.458-1.459c.582-.582 1.57-.582 2.152 0l.836.836a2.25 2.25 0 0 1 0 3.182l-8.612 8.667a.75.75 0 0 1-1.08 0Z" />
                       </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.933 0-3.607 1.08-4.319 2.659-.712-1.579-2.386-2.659-4.319-2.659C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                      </svg>
                    )}
                  </button>
                </td>

                {/* Duration Column */}
                <td className="py-3 px-4">
                  {formatDuration(track.duration_ms)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AlbumPage;