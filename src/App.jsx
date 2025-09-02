import "./App.css";
// UPDATED: Import useEffect
import { useState, useEffect } from "react";
import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Error from "./components/Error";
import PremiumPlansPage from "./components/PremiumPlansPage";
import MyLibraryPage from "./components/MyLibraryPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  // 1. Function to get initial state from localStorage
  const getInitialLikedTracks = () => {
    // Get the saved tracks from localStorage
    const savedTracks = localStorage.getItem("likedTracks");
    // If tracks exist, parse them from string to object, otherwise return an empty object
    return savedTracks ? JSON.parse(savedTracks) : {};
  };

  // 2. Initialize the likedTracks state using the function above
  const [likedTracks, setLikedTracks] = useState(getInitialLikedTracks);
  const [nowPlayingUrl, setNowPlayingUrl] = useState(null);

  // 3. useEffect to save likedTracks to localStorage whenever it changes
  useEffect(() => {
    // Convert the likedTracks object to a string and save it
    localStorage.setItem("likedTracks", JSON.stringify(likedTracks));
  }, [likedTracks]); // This effect runs only when the 'likedTracks' state is updated

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/home"
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
          path="/premium"
          element={
            <ProtectedRoute>
              <PremiumPlansPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-library"
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

        {/* Catch-all Error Route */}
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
