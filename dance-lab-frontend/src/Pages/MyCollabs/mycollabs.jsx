import React, { useEffect, useState } from "react";
import "./mycollabs.css";

const getYouTubeVideoId = (url) => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const MyCollabs = () => {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const fetchProjects = async () => {
    try {
      const res = await fetch("http://localhost:9090/api/collab");
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:9090/api/collab/${id}`, {
        method: "DELETE",
      });
      setProjects(projects.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditData({
      ...editData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const startEditing = (project) => {
    setEditingId(project.id);
    setEditData({
      ...project,
      startDate: project.startDate?.substring(0, 10),
      endDate: project.endDate?.substring(0, 10),
      roles: project.roles.join(", "),
      collaborators: project.collaborators.join(", "),
      videoLink: project.videoLink || "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleUpdate = async () => {
    const updatedProject = {
      ...editData,
      roles: editData.roles.split(",").map((r) => r.trim()),
      collaborators: editData.collaborators.split(",").map((c) => c.trim()),
    };

    try {
      const res = await fetch(
        `http://localhost:9090/api/collab/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProject),
        }
      );

      if (res.ok) {
        fetchProjects();
        cancelEdit();
      } else {
        alert("Update failed.");
      }
    } catch (err) {
      console.error("Error updating project:", err);
    }
  };

  const handleLike = async (id) => {
    try {
      const res = await fetch(`http://localhost:9090/api/collab/${id}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        fetchProjects();
      } else {
        alert("Failed to like project.");
      }
    } catch (err) {
      console.error("Error liking project:", err);
    }
  };

  return (
    <div className="mycollabs-container">
      <h2>Dance Collaboration Projects</h2>
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        projects.map((project) =>
          editingId === project.id ? (
            <div key={project.id} className="project-card edit-mode">
              <input
                type="text"
                name="projectTitle"
                value={editData.projectTitle}
                onChange={handleEditChange}
              />
              <textarea
                name="description"
                value={editData.description}
                onChange={handleEditChange}
              />
              <label>Start Date:</label>
              <input
                type="date"
                name="startDate"
                value={editData.startDate}
                onChange={handleEditChange}
              />
              <label>End Date:</label>
              <input
                type="date"
                name="endDate"
                value={editData.endDate}
                onChange={handleEditChange}
              />
              <input
                type="text"
                name="roles"
                value={editData.roles}
                onChange={handleEditChange}
                placeholder="Roles (comma separated)"
              />
              <input
                type="text"
                name="collaborators"
                value={editData.collaborators}
                onChange={handleEditChange}
                placeholder="Collaborators (comma separated)"
              />
              <input
                type="text"
                name="videoLink"
                value={editData.videoLink}
                onChange={handleEditChange}
                placeholder="Video Link (e.g., YouTube URL)"
              />
              <label>
                <input
                  type="checkbox"
                  name="completed"
                  checked={editData.completed}
                  onChange={handleEditChange}
                />
                Completed
              </label>
              <div className="button-group">
                <button onClick={handleUpdate}>Save</button>
                <button className="cancel" onClick={cancelEdit}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div key={project.id} className="project-card">
              <h3>{project.projectTitle}</h3>
              <p>{project.description}</p>
              <p>
                <strong>Start:</strong>{" "}
                {new Date(project.startDate).toDateString()}
              </p>
              <p>
                <strong>End:</strong>{" "}
                {new Date(project.endDate).toDateString()}
              </p>
              <p>
                <strong>Roles:</strong> {project.roles.join(", ")}
              </p>
              <p>
                <strong>Collaborators:</strong>{" "}
                {project.collaborators.join(", ")}
              </p>
              {project.videoLink && (
                <p>
                  <strong>Video:</strong>{" "}
                  <a
                    href={project.videoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={`https://img.youtube.com/vi/${getYouTubeVideoId(project.videoLink)}/hqdefault.jpg`}
                      alt="Video Thumbnail"
                      className="video-thumbnail"
                    />
                  </a>
                </p>
              )}
              <p>
                <strong>Status:</strong>{" "}
                {project.completed ? "✅ Completed" : "❌ Ongoing"}
              </p>
              <p>
                <strong>Likes:</strong> {project.likes} ❤️
              </p>
              <div className="button-group">
                <button onClick={() => startEditing(project)}>Edit</button>
                <button
                  className="delete"
                  onClick={() => handleDelete(project.id)}
                >
                  Delete
                </button>
                <button
                  className="heart-like"
                  onClick={() => handleLike(project.id)}
                >
                  ❤️
                </button>
              </div>
            </div>
          )
        )
      )}
    </div>
  );
};

export default MyCollabs;