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
    tags: [],
    audienceSize: "",
    targetAgeRange: "",
    isRecurring: false,
    themeColor: "#000000",
    flyerUrl: "",
  });

  const [uploading, setUploading] = useState(false);
  const today = new Date().toISOString().split('T')[0];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTagsChange = (e) => {
    const tagsArray = e.target.value.split(',').map(tag => tag.trim());
    setFormData((prev) => ({
      ...prev,
      tags: tagsArray,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", "your_upload_preset"); // replace with your actual preset

    try {
      setUploading(true);
      const res = await axios.post("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", form); // replace with your cloud name
      setFormData(prev => ({ ...prev, flyerUrl: res.data.secure_url }));
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Failed to upload flyer.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, location, eventDate, judgingCriteria, schedule } = formData;
    if (!title || !location || !eventDate || !judgingCriteria || !schedule) {
      alert("All required fields must be filled.");
      return;
    }

    const formattedEventDate = new Date(eventDate).toISOString();
    const updatedFormData = { ...formData, eventDate: formattedEventDate };

    try {
      const res = await axios.post("http://localhost:9090/api/events", updatedFormData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.status === 201) {
        alert("Event Created Successfully");
        setFormData({
          title: "",
          location: "",
          eventDate: "",
          judgingCriteria: "",
          schedule: "",
          isCanceled: false,
          tags: [],
          audienceSize: "",
          targetAgeRange: "",
          isRecurring: false,
          themeColor: "#000000",
          flyerUrl: "",
        });
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to create event.");
    }
  };

  return (
    <div className="create-event-container">
      <h2>Create Dance Event</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
        <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
        <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} min={today} required />
        <input type="text" name="judgingCriteria" value={formData.judgingCriteria} onChange={handleChange} placeholder="Judging Criteria" required />
        <input type="text" name="schedule" value={formData.schedule} onChange={handleChange} placeholder="Schedule" required />

        <input type="text" placeholder="Tags (comma-separated e.g. Hip-Hop, Ballet)" onChange={handleTagsChange} />
        <input type="number" name="audienceSize" value={formData.audienceSize} onChange={handleChange} placeholder="Audience Size" />
        <input type="text" name="targetAgeRange" value={formData.targetAgeRange} onChange={handleChange} placeholder="Target Age Range" />

        <label className="checkbox-label">
          <input type="checkbox" name="isRecurring" checked={formData.isRecurring} onChange={handleChange} /> Recurring Event
        </label>

        <label className="checkbox-label">
          <input type="checkbox" name="isCanceled" checked={formData.isCanceled} onChange={handleChange} /> Mark as Canceled
        </label>

        <label>
          Theme Color:
          <input type="color" name="themeColor" value={formData.themeColor} onChange={handleChange} />
        </label>

        <label>
          Upload Event Flyer:
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </label>
        {uploading && <p>Uploading flyer...</p>}
        {formData.flyerUrl && (
          <div style={{ marginTop: '1rem' }}>
            <img src={formData.flyerUrl} alt="Flyer Preview" style={{ width: '200px', borderRadius: '8px' }} />
          </div>
        )}

        <button type="submit">Create</button>
      </form>

      {/* Live Preview */}
      <div className="live-preview" style={{ border: "1px dashed #aaa", marginTop: "2rem", padding: "1rem" }}>
        <h3 style={{ color: formData.themeColor }}>{formData.title || "Event Title"}</h3>
        <p>{formData.location || "Location"} | {formData.eventDate ? new Date(formData.eventDate).toDateString() : "Date"}</p>
        <p><strong>Schedule:</strong> {formData.schedule || "Not set"}</p>
        <p><strong>Criteria:</strong> {formData.judgingCriteria || "N/A"}</p>
        <p><strong>Tags:</strong> {formData.tags.join(', ') || "None"}</p>
        <p><strong>Audience:</strong> {formData.audienceSize || "N/A"}</p>
        <p><strong>Age Range:</strong> {formData.targetAgeRange || "N/A"}</p>
        <p><strong>Status:</strong> {formData.isCanceled ? "Canceled" : "Active"}</p>
        <p><strong>Recurring:</strong> {formData.isRecurring ? "Yes" : "No"}</p>
        {formData.flyerUrl && <img src={formData.flyerUrl} alt="Flyer Preview" style={{ width: '200px', marginTop: '10px' }} />}
      </div>
    </div>
  );
}

export default CreateEvent;
