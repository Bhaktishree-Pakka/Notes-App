"use client"
import { useState } from "react"

export function NoteForm({ initialTitle, initialContent, onSubmit }) {
    const [title, setTitle] = useState(initialTitle || "")
    const [content, setContent] = useState(initialContent || "")

    function handleSubmit(e) {
        e.preventDefault();              // prevent page reload
        onSubmit({ title, content });    // call parent callback
    }

    return (
        <div>
            
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Enter content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}