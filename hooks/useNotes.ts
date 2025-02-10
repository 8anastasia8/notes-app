import { useState, useEffect } from "react";
import { RxDatabase } from "rxdb";
import { initDB } from "../db/database";
import { Note } from "../types";
import { fetchNotes } from "../utils/api";
export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [db, setDb] = useState<RxDatabase | null>(null);

  useEffect(() => {
    const loadNotes = async () => {
      const database = await initDB();
      setDb(database);

      const storedNotes = await database.notes.find().exec();
      if (storedNotes.length > 0) {
        setNotes(storedNotes.map((n) => n.toJSON() as Note));
      } else {
        const apiNotes: Note[] = await fetchNotes();
        await database.notes.bulkInsert(apiNotes.slice(0, 10)); 
        setNotes(apiNotes.slice(0, 10));
      }
    };

    loadNotes();
  }, []);

  const addNote = async (title: string, body: string) => {
    if (!db) return;

    const newNote: Note = {
      id: Date.now().toString(),
      userId: 1,
      title,
      body,
    };

    await db.notes.insert(newNote);
    setNotes((prev) => [...prev, newNote]);
  };

  const updateNote = async (id: string, title: string, body: string) => {
    if (!db) return;

    const noteToUpdate = await db.notes.findOne({ selector: { id } }).exec();
    if (noteToUpdate) {
      await noteToUpdate.patch({ title, body });
      setNotes((prev) =>
        prev.map((n) => (n.id === id ? { ...n, title, body } : n))
      );
    }
  };

  const deleteNote = async (id: string) => {
    if (!db) return;

    const noteToDelete = await db.notes.findOne({ selector: { id } }).exec();
    if (noteToDelete) {
      await noteToDelete.remove();
      setNotes((prev) => prev.filter((n) => n.id !== id));
    }
  };

  return { notes, addNote, updateNote, deleteNote };
};
