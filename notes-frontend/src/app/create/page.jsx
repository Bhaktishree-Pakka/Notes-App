"use client";

import { useState } from "react";
import API from "@/api/api";
import { useRouter } from "next/navigation";
import { NoteForm } from "@/components/NoteForm";

export default function CreatePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit({ title, content }) {
    try {
      setLoading(true);
      setError(null);

      const res = await API.post("/api/notes", {
  title,
  content,
});
      router.push("/");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="create-page">
      <h1>Create a New Note</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <NoteForm
        initialTitle=""
        initialContent=""
        onSubmit={handleSubmit}
      />
      {loading && <p>Saving note...</p>}
    </div>
  );
}