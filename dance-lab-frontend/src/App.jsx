// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home/home';
import './App.css';
import VideoUpload from './Pages/Videoupload/VideoUpload';
import VideoList from './Pages/VideoList/VideoList';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videoList" element={<VideoList />} />
          <Route path="/videoupload" element={<VideoUpload />} />
          {/* Add more routes here if needed */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
