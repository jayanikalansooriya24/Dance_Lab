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
    <div>
      <h3>{event.title}</h3>
      <p>{event.location} | {new Date(event.eventDate).toDateString()}</p>
      <p>Criteria: {event.judgingCriteria}</p>
      <p>Status: {event.isCanceled ? "Canceled" : "Active"}</p>
      
      
    </div>
  );
}

export default EventCard;
