import React from "react";
import "./AboutUs.css"; // Create this CSS file for styling

function AboutUs() {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>About Dance Lab</h1>
        <p>
          Dance Lab is the ultimate platform for dancers and enthusiasts to
          showcase talent, connect, and elevate their skills. We believe in
          rhythm, movement, and the power of community.
        </p>
      </section>

      <section className="about-mission">
        <h1>Our Mission</h1>
        <p>
          Our mission is to inspire and empower individuals through dance by
          creating accessible and inclusive spaces for learning, performing, and
          growing.
        </p>
      </section>

      <section className="about-values">
        <h1>What We Offer</h1>
        <ul>
          <li>🎵 Dance Classes for All Levels</li>
          <li>🎭 Talent Showcases & Competitions</li>
          <li>🌍 Community Building & Collaboration</li>
          <li>📆 Event Booking & Participation</li>
        </ul>
      </section>

      <section className="about-cta">
        <h2>Join Our Journey</h2>
        <p>
          Whether you're a beginner or a seasoned dancer, there's a place for
          you here. Let’s dance, connect, and grow together.
        </p>
        <button className="join-btn">Join the Movement</button>
      </section>
    </div>
  );
}

export default AboutUs;
