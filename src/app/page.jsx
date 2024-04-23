"use client";
import styles from "./page.module.css";
import { useState, useEffect, useRef } from "react";
import Note from "@/components/note/note";
import { getNotes, saveNotes } from "@/utils/storage";
import { AddNote, Search } from "@/components/Icons/Icons";
import Checkbox from "@/components/checkbox/checkbox";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);
  const [newNoteContent, setNewNoteContent] = useState("");

  const initialLoad = useRef(true);

  useEffect(() => {
    const loadedNotes = getNotes();
    setNotes(loadedNotes);
  }, []);

  useEffect(() => {
    if (initialLoad.current) {
      initialLoad.current = false;
      return;
    }
    saveNotes(notes);
  }, [notes]);

  const addNote = () => {
    if (!newNoteContent) return;
    setNotes((prevNotes) => {
      const newNotes = [
        ...prevNotes,
        { id: Date.now(), content: newNoteContent, completed: false },
      ];
      saveNotes(newNotes);
      return newNotes;
    });
    setNewNoteContent("");
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    saveNotes(updatedNotes);
    setNotes(updatedNotes);
  };

  const toggleNoteStatus = (id) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, completed: !note.completed } : note
    );
    saveNotes(updatedNotes);
    setNotes(updatedNotes);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote();
  };

  return (
    <div className={styles.home}>
      <div className={styles.searchInput}>
        <Search />
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search notes"
        />
      </div>

      <div className={styles.filterContainer}>
        <Checkbox
          checked={showCompleted}
          onChange={(e) => setShowCompleted(e.target.checked)}
        />

        <span className={styles.filter}>Filter completed</span>
      </div>

      {notes
        .filter(
          (note) =>
            note.content.toLowerCase().includes(filter.toLowerCase()) &&
            (showCompleted ? note.completed : true)
        )
        .map((note) => (
          <Note
            key={note.id}
            note={note}
            onDelete={deleteNote}
            onToggleStatus={toggleNoteStatus}
          />
        ))}

      <form className={styles.addNoteContainer} onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.input}
          value={newNoteContent}
          onChange={(e) => setNewNoteContent(e.target.value)}
          placeholder="Enter new note content"
        />
        <button type="submit" className={styles.addNote}>
          <AddNote />
        </button>
      </form>
    </div>
  );
}
