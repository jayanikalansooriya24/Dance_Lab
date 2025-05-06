import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home/home';
import './App.css';
import VideoUpload from './Pages/Videoupload/VideoUpload';
import VideoList from './Pages/VideoList/VideoList';
import Signup from './Pages/SignUp/SignUp';
import Login from './Pages/Login/Login';
import UserProfile from './Pages/UserProfile/UserProfile';
import { AuthProvider } from './Context/AuthContext'; // ✅ Corrected import

function App() {
  return (
    <Router>
      <AuthProvider> {/* ✅ Corrected usage */}
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/videoList" element={<VideoList />} />
            <Route path="/videoupload" element={<VideoUpload />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
