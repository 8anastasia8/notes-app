import React, { useState } from "react";

interface NoteFormProps {
  onAdd: (title: string, body: string) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    onAdd(title, body);
    setTitle("");
    setBody("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded-lg">
      <input
        className="border p-2 w-full mb-2 caret-gray-600 text-black"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="border p-2 w-full mb-2 text-black"
        placeholder="Description"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button className="bg-green-500 text-white px-4 py-2 rounded w-full" type="submit">
        Add note
      </button>
    </form>
  );
};

export default NoteForm;
