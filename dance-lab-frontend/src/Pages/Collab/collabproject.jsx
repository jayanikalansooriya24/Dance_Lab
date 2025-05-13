import React, { useState } from "react";
import "./collabproject.css";

const CollabProject = () => {
  const [project, setProject] = useState({
    projectTitle: "",
    description: "",
    startDate: "",
    endDate: "",
    roles: "",
    collaborators: "",
    completed: false,
    videoLink: "", // New field for video link
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProject({
      ...project,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...project,
      roles: project.roles.split(",").map((r) => r.trim()),
      collaborators: project.collaborators.split(",").map((c) => c.trim()),
    };

    try {
      const response = await fetch("http://localhost:9090/api/collab", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Collab project created successfully!");
        setProject({
          projectTitle: "",
          description: "",
          startDate: "",
          endDate: "",
          roles: "",
          collaborators: "",
          completed: false,
          videoLink: "", // Reset video link
        });
      } else {
        alert("Failed to create project.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error.");
    }
  };

  return (
    <div className="collab-create-container">
      <h2>Create a Dance Collaboration Project</h2>
      <form onSubmit={handleSubmit} className="collab-form">
        <input
          type="text"
          name="projectTitle"
          placeholder="Project Title"
          value={project.projectTitle}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={project.description}
          onChange={handleChange}
          required
        />
        <label>Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={project.startDate}
          onChange={handleChange}
          required
        />
        <label>End Date:</label>
        <input
          type="date"
          name="endDate"
          value={project.endDate}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="roles"
          placeholder="Roles (comma separated)"
          value={project.roles}
          onChange={handleChange}
        />
        <input
          type="text"
          name="collaborators"
          placeholder="Collaborators (comma separated)"
          value={project.collaborators}
          onChange={handleChange}
        />
        <input
          type="text"
          name="videoLink"
          placeholder="Video Link (e.g., YouTube URL)"
          value={project.videoLink}
          onChange={handleChange}
        />
        <label>
          <input
            type="checkbox"
            name="completed"
            checked={project.completed}
            onChange={handleChange}
          />
          Mark as Completed
        </label>
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default CollabProject;