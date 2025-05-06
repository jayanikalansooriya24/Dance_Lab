import { useNavigate } from "react-router-dom";
import axios from "axios";

function EventCard({ event }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm("Are you sure to delete this event?")) {
      await axios.delete(`http://localhost:9090/api/events/${event.id}`);
      window.location.reload();
    }
  };

  return (
    <div style={{ borderLeft: `6px solid ${event.themeColor}`, paddingLeft: "10px" }}>
      <h3 style={{ color: event.themeColor }}>{event.title}</h3>
      <p>{event.location} | {new Date(event.eventDate).toDateString()}</p>
      <p><strong>Criteria:</strong> {event.judgingCriteria}</p>
      <p><strong>Schedule:</strong> {event.schedule}</p>
      <p><strong>Status:</strong> {event.isCanceled ? "Canceled" : "Active"}</p>
      <p><strong>Tags:</strong> {event.tags?.join(", ") || "None"}</p>
      <p><strong>Recurring:</strong> {event.isRecurring ? "Yes" : "No"}</p>
    </div>
  );
}

export default EventCard;
