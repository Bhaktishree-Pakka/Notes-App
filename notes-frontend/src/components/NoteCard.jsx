"use client";

import { useState } from "react";
import API from "@/api/api";

const NoteCard = ({ title, content, date, id, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);

  async function handleDelete() {
    try {
      if (!confirm("Delete this note?")) return;

      await API.delete(`/api/notes/${id}`);
      onDelete(id);
    } catch (err) {
      console.log("Delete failed");
    }
  }

  async function handleUpdate() {
    try {
      const res = await API.put(`/api/notes/${id}`, {
        title: newTitle,
        content: newContent,
      });

      onEdit(res.data);
      setIsEditing(false);
    } catch (err) {
      console.log("Update failed");
    }
  }

  return (
    <div className="notes-card">
      {isEditing ? (
        <>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />

          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />

          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h2>{title}</h2>
          <p>
  {content.length > 120
    ? content.slice(0, 120) + "..."
    : content}
</p>
          <p>{new Date(date).toLocaleString()}</p>

          <div className="actions">
  <button onClick={() => setIsEditing(true)}>Edit</button>
  <button onClick={handleDelete}>Delete</button>
</div>
        </>
      )}
    </div>
  );
};

export default NoteCard;