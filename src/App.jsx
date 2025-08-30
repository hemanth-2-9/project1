import './App.css';
import { useState } from 'react';
import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Error from './components/Error';
import PremiumPlansPage from './components/PremiumPlansPage';
import MyLibraryPage from './components/MyLibraryPage';
// UPDATED: Import the new ProtectedRoute component
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [likedTracks, setLikedTracks] = useState({});
  const [nowPlayingUrl, setNowPlayingUrl] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes: These are accessible to everyone. */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path='/login' element={<Login />} />

        {/* Protected Routes: These are wrapped with ProtectedRoute.
            A user will be redirected to /login if they try to access these without being logged in. */}
        <Route 
          path='/home' 
          element={
            <ProtectedRoute>
              <Home 
                likedTracks={likedTracks} 
                setLikedTracks={setLikedTracks}
                setNowPlaying={setNowPlayingUrl} 
              />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/premium' 
          element={
            <ProtectedRoute>
              <PremiumPlansPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/my-library' 
          element={
            <ProtectedRoute>
              <MyLibraryPage 
                likedTracks={likedTracks} 
                setLikedTracks={setLikedTracks}
                setNowPlaying={setNowPlayingUrl} 
              />
            </ProtectedRoute>
          } 
        />
        
        {/* This route will catch any undefined paths. */}
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
