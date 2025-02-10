import { useNotes } from "../hooks/useNotes";
import NoteList from "../components/NoteList";
import NoteForm from "@/components/NoteForm";

export default function Home() {
  const { notes, addNote, updateNote, deleteNote } = useNotes();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Notes App</h1>
      <NoteForm onAdd={addNote} />
      <NoteList notes={notes} onUpdate={updateNote} onDelete={deleteNote} />
    </div>
  );
}
