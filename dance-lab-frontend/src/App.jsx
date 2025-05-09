import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home/home';
import Collab from './Pages/Collab/collabproject'
import MyCollabs from './Pages/MyCollabs/mycollabs'
import Eventcreate from "./Pages/Eventcreate/CreateEvent";
import Eventview from "./Pages/Eventview/ViewEvents";
import AboutUs from './Pages/Aboutus/AboutUs'; // Import the AboutUs component
import ContactUs from './Pages/Contactus/Contact'; // Import the ContactUs component
import Dashboard from './Pages/Dashboard/Dashboard';
import AnalysisManagement from './Pages/AnalysisManagement/AnalysisManagement';
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
          <Route path="/collab" element={<Collab />} />
          <Route path="/mycollab" element={<MyCollabs />} />
          <Route path="/analysis" element={<AnalysisManagement />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/eventsview" element={<Eventview />} />
          <Route path="/create" element={<Eventcreate />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
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
