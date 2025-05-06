// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home/home';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import AnalysisManagement from './Pages/AnalysisManagement/AnalysisManagement';
import Dashboard from './Pages/Dashboard/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analysis" element={<AnalysisManagement />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;