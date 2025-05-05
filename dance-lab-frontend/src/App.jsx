import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';

import Home from './Pages/Home/home';
import Eventcreate from "./Pages/Eventcreate/CreateEvent";
import Eventview from "./Pages/Eventview/ViewEvents";
import AboutUs from './Pages/Aboutus/AboutUs'; // Import the AboutUs component
import ContactUs from './Pages/Contactus/Contact'; // Import the ContactUs component


import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/eventsview" element={<Eventview />} />
          <Route path="/create" element={<Eventcreate />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
           
  
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
