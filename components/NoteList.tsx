import React from "react";
import NoteItem from "./NoteItem";
import { Note } from "../types";

interface NoteListProps {
  notes: Note[];
  onUpdate: (id: string, title: string, body: string) => void;
  onDelete: (id: string) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, onUpdate, onDelete }) => {
  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default NoteList;
