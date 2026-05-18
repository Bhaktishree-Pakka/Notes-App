"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import NoteCard from "../components/NoteCard";
import API from "@/api/api";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    if (token) {
      fetchNotes();
    }
  }, []);

  async function fetchNotes() {
    try {
      setLoading(true);
      const res = await API.get("/api/notes");
      setNotes(res.data);
    } catch (err) {
      console.log("Error fetching notes");
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(updatedNote) {
  setNotes(
    notes.map((note) =>
      note._id === updatedNote._id ? updatedNote : note
    )
  );
}

  // ✅ DELETE HANDLER
  function handleDelete(id) {
    setNotes(notes.filter((note) => note._id !== id));
  }

  return (
    <div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Link href="/create">
          <button className="create-btn">+ Create Note</button>
        </Link>
      </div>

      {!isLoggedIn && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Please login to view your notes
        </p>
      )}

      {isLoggedIn && (
        <div className="notes-grid">
          {loading && <h4>Loading...</h4>}

          {!loading && notes.length === 0 && (
            <p style={{ textAlign: "center" }}>No notes yet</p>
          )}

          {notes.map((note) => (
            <NoteCard
              key={note._id}
              id={note._id}   // ✅ IMPORTANT
              title={note.title}
              content={note.content}
              date={note.createdAt}
              onDelete={handleDelete}  // ✅ IMPORTANT
              onEdit={handleEdit} 
            />
          ))}
        </div>
      )}
    </div>
  );
}