import React, { useState } from "react";
import { Note } from "../types";

interface NoteItemProps {
  note: Note;
  onUpdate: (id: string, title: string, body: string) => void;
  onDelete: (id: string) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);

  const handleSave = () => {
    onUpdate(note.id, title, body);
    setIsEditing(false);
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      {isEditing ? (
        <div>
          <input
            className="border p-2 w-full mb-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="border p-2 w-full mb-2"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSave}>
            Save
          </button>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-semibold">{note.title}</h3>
          <p className="text-gray-600">{note.body}</p>
          <p className="text-sm text-gray-500">User ID: {note.userId}</p>
          <div className="mt-2 flex gap-2">
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => onDelete(note.id)}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteItem;
