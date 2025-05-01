import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    eventDate: "",
    judgingCriteria: "",
    schedule: "",
    isCanceled: false,
  });

  useEffect(() => {
    axios.get("http://localhost:8080/api/events")
      .then(res => {
        const event = res.data.find(e => e.id === id);
        if (event) {
          setFormData({ ...event, eventDate: event.eventDate.split("T")[0] });
        }
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/api/events/${id}`, formData);
    navigate("/");
  };

  return (
    <div>
      <h2>Edit Dance Event</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" value={formData.title} onChange={handleChange} />
        <input name="location" value={formData.location} onChange={handleChange} />
        <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} />
        <input name="judgingCriteria" value={formData.judgingCriteria} onChange={handleChange} />
        <input name="schedule" value={formData.schedule} onChange={handleChange} />
        <label>
          Canceled:
          <input type="checkbox" name="isCanceled" checked={formData.isCanceled} onChange={handleChange} />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditEvent;
