import { useState } from "react";
import axios from "axios";
import './CreateEvent.css';

function CreateEvent() {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    eventDate: "",
    judgingCriteria: "",
    schedule: "",
    isCanceled: false,
  });

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { title, location, eventDate, judgingCriteria, schedule } = formData;
    if (!title.trim() || !location.trim() || !eventDate || !judgingCriteria.trim() || !schedule.trim()) {
      alert("All fields are required. Please fill in all the details.");
      return;
    }
  
    // Format the eventDate to ensure proper format for backend
    const formattedEventDate = new Date(formData.eventDate).toISOString();
  
    const updatedFormData = {
      ...formData,
      eventDate: formattedEventDate,
    };
  
    try {
      const response = await axios.post("http://localhost:9090/api/events", updatedFormData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 201) {
        alert("Event Created Successfully");
  
        // Reset form
        setFormData({
          title: "",
          location: "",
          eventDate: "",
          judgingCriteria: "",
          schedule: "",
          isCanceled: false,
        });
      }
    } catch (err) {
      console.error("Error details:", err);
      alert("Failed to create event. Please try again.");
    }
  };
  

  return (
    <div className="create-event-container">
      <h2>Create Dance Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          required
        />
        <input
          type="date"
          name="eventDate"
          value={formData.eventDate}
          onChange={handleChange}
          min={today} // prevent past dates
          required
        />
        <input
          type="text"
          name="judgingCriteria"
          value={formData.judgingCriteria}
          onChange={handleChange}
          placeholder="Judging Criteria"
          required
        />
        <input
          type="text"
          name="schedule"
          value={formData.schedule}
          onChange={handleChange}
          placeholder="Schedule"
          required
        />
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="isCanceled"
            checked={formData.isCanceled}
            onChange={handleChange}
          />
          Mark as Canceled
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateEvent;
