import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'; // Import your CSS file for styling
import heroImg from '../../assets/1.jpg';

const Home = () => {
  return (
    <div className="home-container">
     <section className="hero-section">
  <div className="hero-content">
   
    <h1>Unleash Your Rhythm, Share Your Passion</h1><br></br>
    <p>The ultimate platform for dancers and enthusiasts to showcase talent, connect, and elevate skills.</p><br></br>

    <div className="cta-buttons">
      <Link to="/signup" className="cta-button primary">Join Now</Link>
      <Link to="/explore" className="cta-button secondary">Explore</Link>
    </div>

    <div className="hero-image-section">
      <img src={heroImg} alt="Dancers" className="hero-full-image" />
    </div>
  </div>
</section>




      {/* Features Section */}
      <section className="features-section">
        <h2>Why Dance Lab?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎬</div>
            <h3>Share Your Performances</h3>
            <p>Upload and share your dance videos with a community that appreciates your art.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Connect with Dancers</h3>
            <p>Find and follow dancers with similar interests or styles that inspire you.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Learn & Grow</h3>
            <p>Access tutorials and get feedback from professionals and enthusiasts alike.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Build Your Profile</h3>
            <p>Create a personalized dance portfolio to showcase your journey and achievements.</p>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="community-section">
        <h2>Join Our Vibrant Community</h2>
        <p>Connect with dancers, instructors, choreographers, and influencers worldwide.</p>
        <div className="community-stats">
          <div className="stat">
            <span className="stat-number">10K+</span>
            <span className="stat-label">Active Dancers</span>
          </div>
          <div className="stat">
            <span className="stat-number">5K+</span>
            <span className="stat-label">Dance Videos</span>
          </div>
          <div className="stat">
            <span className="stat-number">1K+</span>
            <span className="stat-label">Tutorials</span>
          </div>
        </div>
        <div className="testimonials">
          {/* Testimonial cards could go here */}
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>Ready to Unleash Your Rhythm?</h2>
        <p>Join Dance Lab today and become part of a community that celebrates the art of dance.</p>
        <Link to="/signup" className="cta-button primary">Get Started</Link>
      </section>
    </div>
  );
};

export default Home;