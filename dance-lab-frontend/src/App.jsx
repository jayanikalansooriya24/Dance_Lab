import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';

import Home from './Pages/Home/home';
import Eventcreate from "./Pages/Eventcreate/CreateEvent";
import Eventview from "./Pages/Eventview/ViewEvents";
import Eventedit from "./Pages/Eventedit/EditEvent";

import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Eventview />} />
          <Route path="/create" element={<Eventcreate />} />
          <Route path="/edit/:id" element={<Eventedit />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
