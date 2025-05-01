import { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../EventCard/EventCard"; // ✅ fixed path

function ViewEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Upcoming Dance Events</h2>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export default ViewEvents;
