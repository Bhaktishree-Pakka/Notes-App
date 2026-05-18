"use client"
import { useState, useEffect } from "react";
import API from "@/api/api";
import { useRouter } from "next/navigation";
import { NoteForm } from "@/components/NoteForm";

export default function NoteIDPage({ params }) {
  const { id } = params;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [note, setNote] = useState()

useEffect(() => {
  async function fetchNote() {
    try {
      setLoading(true);
const res = await API.get(`/api/notes/${id}`);
      setNote(res.data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }
  fetchNote();
}, [id]);

  async function editNote({title,content}) {
    try {
      setLoading(true);
      await API.put(`/api/notes/${id}`, { title, content });
      const res = await API.put(`/api/notes/${id}`, { title, content });
      setNote(res.data);
      router.push("/");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function deleteNote() {
    try {
      setLoading(true);
      const res = await API.delete(`/api/notes/${id}`);
      router.push("/");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button onClick={deleteNote} disabled={loading} className="delete-btn">Delete Note</button>
      <NoteForm
        initialTitle={note?.title || ""}
        initialContent={note?.content || ""}
        onSubmit={editNote}
        disabled={loading}
      />
    </div>
  )
}