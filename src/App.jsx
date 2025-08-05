import './App.css';
import React, { useState } from 'react';
import Login from './components/Login';
import Home from './components/Home';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Error from './components/Error';
import PremiumPlansPage from './components/PremiumPlansPage';
import MyLibraryPage from './components/MyLibraryPage';
import AudioPlayer from './components/AudioPlayer'; // Import the AudioPlayer component

function App() {
  const [likedTracks, setLikedTracks] = useState({});
  // Add new state for the music player, which will hold the song's preview URL
  const [nowPlayingUrl, setNowPlayingUrl] = useState(null);

  return (
    <BrowserRouter>
      {/* The main content that changes based on the route.
        The `nowPlayingUrl` state is managed here and passed down.
      */}
      <Routes>
        <Route path='/login' element={<Login />} />
        {/* Pass the function to set the playing track's URL to the Home component */}
        <Route 
          path='/' 
          element={
            <Home 
              likedTracks={likedTracks} 
              setLikedTracks={setLikedTracks}
              setNowPlaying={setNowPlayingUrl} // Pass the function to update the playing URL
            />
          } 
        />
        <Route path='/premium' element={<PremiumPlansPage />} />
        {/* Pass the function to set the playing track's URL to the MyLibraryPage */}
        <Route 
          path='/my-library' 
          element={
            <MyLibraryPage 
              likedTracks={likedTracks} 
              setLikedTracks={setLikedTracks}
              setNowPlaying={setNowPlayingUrl} // Pass the function to update the playing URL
            />
          } 
        />
        <Route path='*' element={<Error />} />
      </Routes>
      
      {/* The AudioPlayer component is rendered at the top level, outside of Routes.
        It will only be visible if nowPlayingUrl is not null, ensuring it's not
        on the screen when no song is selected.
      */}
      {nowPlayingUrl && <AudioPlayer nowPlayingUrl={nowPlayingUrl} />}
    </BrowserRouter>
  );
}

export default App;