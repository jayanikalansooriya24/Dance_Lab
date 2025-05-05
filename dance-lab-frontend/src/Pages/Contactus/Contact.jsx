import React from "react";
import "./Contact.css";

function ContactUs() {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p className="sub-text">
        Have a question or want to get involved? Reach out to us!
      </p>

      {/* You can add your image and form here */}
      <div className="contact-content">
        <div className="contact-image">
          {/* Example image placeholder (optional) */}
          {/* <img src={require("../../assets/contact.png")} alt="Contact" /> */}
        </div>

        <form className="contact-form">
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            required
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>

      <div className="contact-info">
        <p>📍 Location: Colombo, Sri Lanka</p>
        <p>📞 Phone: +94 77 123 4567</p>
        <p>✉️ Email: contact@dancelab.lk</p>
      </div>
    </div>
  );
}

export default ContactUs;
