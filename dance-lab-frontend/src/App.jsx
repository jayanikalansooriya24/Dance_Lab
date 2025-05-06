// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';

import Home from './Pages/Home/home';
import Collab from './Pages/Collab/collabproject'
import MyCollabs from './Pages/MyCollabs/mycollabs'

import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collab" element={<Collab />} />
          <Route path="/mycollab" element={<MyCollabs />} />
         
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
