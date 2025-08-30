import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import AlbumPage from "./AlbumPage";
import Sidebar from "./Sidebar";
import ErrorScreen from "./ErrorScreen";
import SearchBar from "./SearchBar";

function Home({ likedTracks, setLikedTracks, setNowPlaying }) { 
  const [tracks, setTracks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [release, setRelease] = useState([]);

  const [albumData, setAlbumData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);

  const [showAlbumPage, setShowAlbumPage] = useState(false);
  const [showCategoryPage, setShowCategoryPage] = useState(false);
  const [showErrorScreen, setShowErrorScreen] = useState(false);
  const [errorSource, setErrorSource] = useState(null);
  
  const navigate = useNavigate();

  const handleError = (source, error) => {
    console.error(`Error fetching ${source}:`, error);
    setErrorSource(source);
    setShowErrorScreen(true);
  };

  const fetchAuthenticatedData = async (url) => {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      navigate('/login', { replace: true });
      return null;
    }

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, options);

    if (response.status === 401) {
      localStorage.removeItem('jwt_token');
      navigate('/login', { replace: true });
      throw new Error('Unauthorized');
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

  useEffect(() => {
    const loadInitialData = async () => {
        try {
            const featuredPlaylistsData = await fetchAuthenticatedData("https://apis2.ccbp.in/spotify-clone/featured-playlists");
            if (featuredPlaylistsData) setTracks(featuredPlaylistsData.playlists.items);

            const categoriesData = await fetchAuthenticatedData("https://apis2.ccbp.in/spotify-clone/categories");
            if (categoriesData) setCategories(categoriesData.categories.items);

            const newReleasesData = await fetchAuthenticatedData("https://apis2.ccbp.in/spotify-clone/new-releases");
            if (newReleasesData) setRelease(newReleasesData.albums.items);

        } catch (error) {
            if (error.message !== 'Unauthorized') {
                handleError("initial data", error);
            }
        }
    };
    
    loadInitialData();
  }, []);

  async function openAlbum(albumId) {
    try {
      const data = await fetchAuthenticatedData(`https://apis2.ccbp.in/spotify-clone/albums-details/${albumId}`);
      if(data) {
        setAlbumData(data);
        setShowAlbumPage(true);
        setShowCategoryPage(false);
      }
    } catch (error) {
       if (error.message !== 'Unauthorized') handleError("album details", error);
    }
  }

  async function playPlaylist(playlistId) {
    try {
        const data = await fetchAuthenticatedData(`https://apis2.ccbp.in/spotify-clone/playlists-details/${playlistId}`);
        if(data) {
            setAlbumData(data);
            setShowAlbumPage(true);
            setShowCategoryPage(false);
            const firstTrack = data.tracks.items[0]?.track;
            if (firstTrack && firstTrack.preview_url) {
                setNowPlaying(firstTrack.preview_url);
            }
        }
    } catch (error) {
        if (error.message !== 'Unauthorized') handleError("playlist details", error);
    }
  }

  async function openCategory(categoryId) {
    try {
        const data = await fetchAuthenticatedData(`https://apis2.ccbp.in/spotify-clone/categories-playlists/${categoryId}`);
        if (data) {
            setCategoryData(data.playlists.items);
            setShowCategoryPage(true);
            setShowAlbumPage(false);
        }
    } catch (error) {
        if (error.message !== 'Unauthorized') handleError("category playlists", error);
    }
  }

  if (showErrorScreen) {
    return <ErrorScreen errorSource={errorSource} />;
  }

  if (categories.length === 0 && tracks.length === 0 && release.length === 0) {
    return <Loading />;
  }

  if (showAlbumPage && albumData) {
    return (
      <AlbumPage
        albumData={albumData}
        setShowAlbumPage={setShowAlbumPage}
        setNowPlaying={setNowPlaying}
        likedTracks={likedTracks}
        setLikedTracks={setLikedTracks}
      />
    );
  }

  return (
    <div className="bg-[#121212] h-screen flex font-montserrat">
      <Sidebar />
      <div className="flex-1 overflow-y-auto p-8 lg:p-10 pb-20">
        {showCategoryPage ? (
          <>
            <button
              onClick={() => {
                setShowCategoryPage(false);
                setCategoryData(null);
              }}
              className="text-gray-300 hover:text-white transition-colors duration-200 text-lg font-semibold mb-6 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Home
            </button>
            <h1 className="text-white text-3xl font-bold mb-8">
              Category Playlists
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {categoryData?.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#1A1A1A] rounded-lg p-4 cursor-pointer hover:bg-[#282828] transition-all duration-300 group relative"
                  onClick={() => playPlaylist(item.id)}
                >
                  <div className="relative w-full aspect-square mb-4">
                    {item.images?.[0]?.url && (
                      <img
                        src={item.images[0].url}
                        alt={item.name}
                        className="w-full h-full rounded-md object-cover shadow-md"
                      />
                    )}
                  </div>
                  <h2 className="text-base text-white font-bold mt-2 truncate">
                    {item.name}
                  </h2>
                  <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                    {item.description || `${item.tracks?.total || 0} Tracks`}
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="mb-8">
              <SearchBar />
            </div>

            <h1 className="text-white text-3xl font-bold mb-8 font-montserrat">
              Editor's Picks
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {tracks.map((track) => (
                <div
                  key={track.id}
                  className="bg-[#1A1A1A] rounded-lg p-4 cursor-pointer hover:bg-[#282828] transition-all duration-300 group relative"
                  onClick={() => playPlaylist(track.id)}
                >
                  <div className="relative w-full aspect-square mb-4">
                    {track.images?.[0]?.url && (
                      <img
                        src={track.images[0].url}
                        alt={track.name}
                        className="w-full h-full rounded-md object-cover shadow-md"
                      />
                    )}
                  </div>
                  <h2 className="text-base text-white font-bold mt-2 truncate">
                    {track.name}
                  </h2>
                  {track.description && (
                      <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                          {track.description}
                      </p>
                  )}
                </div>
              ))}
            </div>

            <h1 className="text-white text-3xl font-bold mt-12 mb-8 font-montserrat">
              Genres & Moods
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="bg-[#1A1A1A] rounded-lg p-4 cursor-pointer hover:bg-[#282828] transition-all duration-300 group relative"
                  onClick={() => openCategory(category.id)}
                >
                  <div className="relative w-full aspect-square mb-4">
                    {category.icons?.[0]?.url && (
                      <img
                        alt={category.name}
                        src={category.icons[0].url}
                        className="w-full h-full rounded-md object-cover shadow-md"
                      />
                    )}
                  </div>
                  <h2 className="text-base text-white font-bold mt-2 truncate">
                    {category.name}
                  </h2>
                </div>
              ))}
            </div>

            <h1 className="text-white text-3xl font-bold mt-12 mb-8 font-montserrat">
              New Releases
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {release.map((rel) => (
                <div
                  key={rel.id}
                  className="bg-[#1A1A1A] rounded-lg p-4 cursor-pointer hover:bg-[#282828] transition-all duration-300 group relative"
                  onClick={() => openAlbum(rel.id)}
                >
                  <div className="relative w-full aspect-square mb-4">
                    {rel.images?.[0]?.url && (
                      <img
                        src={rel.images[0].url}
                        alt={rel.name}
                        className="w-full h-full rounded-md object-cover shadow-md"
                      />
                    )}
                  </div>
                  <h2 className="text-base text-white font-bold mt-2 truncate">
                    {rel.name}
                  </h2>
                    <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                        {rel.artists?.[0]?.name || "Unknown Artist"}
                    </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;

