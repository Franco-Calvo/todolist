import React from "react";
import styles from "./note.module.css";
import { Trash } from "../Icons/Icons";
import Checkbox from "../checkbox/checkbox";

const Note = ({ note, onDelete, onToggleStatus }) => {
  return (
    <div className={styles.note}>
      <div className={note.completed ? styles.completed : styles.incomplete} />
      <Checkbox
        checked={note.completed}
        onChange={() => onToggleStatus(note.id)}
      />
      <p className={styles.content}>{note.content}</p>
      <button className={styles.deleteNote} onClick={() => onDelete(note.id)}>
        <Trash />
      </button>
    </div>
  );
};

export default Note;
