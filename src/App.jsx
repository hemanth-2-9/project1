import './App.css';
import { useState} from 'react';
import { Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Error from './components/Error';
import PremiumPlansPage from './components/PremiumPlansPage';
import MyLibraryPage from './components/MyLibraryPage';
import AudioPlayer from './components/AudioPlayer'; 

function App() {
  const [likedTracks, setLikedTracks] = useState({});
  const [nowPlayingUrl, setNowPlayingUrl] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path='/login' element={<Login />} />
        <Route 
          path='/home ' 
          element={
            <Home 
              likedTracks={likedTracks} 
              setLikedTracks={setLikedTracks}
              setNowPlaying={setNowPlayingUrl} 
            />
          } 
        />
        <Route path='/premium' element={<PremiumPlansPage />} />
        <Route 
          path='/my-library' 
          element={
            <MyLibraryPage 
              likedTracks={likedTracks} 
              setLikedTracks={setLikedTracks}
              setNowPlaying={setNowPlayingUrl} 
            />
          } 
        />
        <Route path='*' element={<Error />} />
      </Routes>
      {nowPlayingUrl && <AudioPlayer nowPlayingUrl={nowPlayingUrl} />}
    </BrowserRouter>
  );
}

export default App;