import { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../EventCard/EventCard"; // ✅ fixed path
import './ViewEvents.css'; // Ensure the file is in the same folder

function ViewEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editEvent, setEditEvent] = useState(null); // For storing the event to be edited
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    eventDate: "",
    judgingCriteria: "",
    schedule: "",
    isCanceled: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:9090/api/events")
      .then((res) => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching events. Please try again later.");
        setLoading(false);
      });
  }, []);

  // Delete event function
  const deleteEvent = (id) => {
    axios
      .delete(`http://localhost:9090/api/events/${id}`)
      .then((response) => {
        // Remove the event from the state after successful deletion
        setEvents(events.filter((event) => event.id !== id));
        alert("Event deleted successfully.");
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
        alert("Error deleting event. Please try again.");
      });
  };

  // Update event function
  const updateEvent = (id) => {
    const eventToUpdate = events.find((event) => event.id === id);
    setEditEvent(eventToUpdate); // Set the event to be edited
    setFormData(eventToUpdate); // Pre-fill the form with the event data
  };

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle event update submission
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:9090/api/events/${editEvent.id}`, formData)
      .then((response) => {
        setEvents(events.map((event) => (event.id === editEvent.id ? response.data : event)));
        alert("Event updated successfully.");
        setEditEvent(null); // Close the update form
      })
      .catch((error) => {
        console.error("Error updating event:", error);
        alert("Error updating event. Please try again.");
      });
  };

  // Get today's date for validation
  const todayDate = new Date().toISOString().split("T")[0];

  // Form validation check
  const isFormValid = formData.title && formData.location && formData.eventDate && formData.judgingCriteria && formData.schedule;

  return (
    <div className="view-events-container">
      <div className="events-header">
        <h2>Upcoming Dance Events</h2>
        <p>Check out the exciting events happening near you!</p>
      </div>

      {/* Display loading state */}
      {loading && <p>Loading events...</p>}

      {/* Display error message if API request fails */}
      {error && <p className="error-message">{error}</p>}

      {/* Display no events message if no events are available */}
      {!loading && !error && events.length === 0 && (
        <div className="no-events">
          <div className="no-events-icon"></div>
          <h3>No upcoming events at the moment</h3>
          <p>Please check back later!</p>
          
        </div>
      )}

      {/* Display events if available */}
      {!loading && !error && events.length > 0 && (
        <div className="events-grid">
          {events.map((event) => (
            <div key={event.id} className="event-card">
                
              {/* Display event details */}
              
              <EventCard event={event} />
              <p className="event-schedule">Schedule: {event.schedule}</p>

              {/* Edit and Delete buttons */}
              <div className="event-actions">
                <button className="update-button" onClick={() => updateEvent(event.id)}>
                  Update
                </button>
                <button className="delete-button" onClick={() => deleteEvent(event.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Update Event Modal or Form */}
      {editEvent && (
        <div className="update-form">
          <h3>Update Event</h3>
          <form onSubmit={handleUpdateSubmit}>
            <div>
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label>Event Date</label>
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                min={todayDate} // Prevent selecting past dates
                required
              />
            </div>
            <div>
              <label>Judging Criteria</label>
              <input
                type="text"
                name="judgingCriteria"
                value={formData.judgingCriteria}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Schedule</label>
              <input
                type="text"
                name="schedule"
                value={formData.schedule}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>
                Canceled
                <input
                  type="checkbox"
                  name="isCanceled"
                  checked={formData.isCanceled}
                  onChange={(e) =>
                    setFormData({ ...formData, isCanceled: e.target.checked })
                  }
                />
              </label>
            </div>
            <button type="submit" disabled={!isFormValid}>Update Event</button>
            <button
              type="button"
              onClick={() => setEditEvent(null)} // Close the update form
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ViewEvents;
