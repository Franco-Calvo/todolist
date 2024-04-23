import React from "react";
import styles from "./checkbox.module.css";

export default function Checkbox({ checked, onChange }) {
  return (
    <label className={styles.checkboxContainer}>
      <input
        className={styles.customCheckbox}
        checked={checked}
        onChange={onChange}
        type="checkbox"
      />
      <span className={styles.checkmark} />
    </label>
  );
}
